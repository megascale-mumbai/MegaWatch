"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Star, Send, CheckCircle } from "lucide-react";

function ReviewCard({ review }) {
  const date = review.created_at || review.date
    ? new Date(review.created_at || review.date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="border border-black/5 rounded-2xl p-6 md:p-8 space-y-3 bg-stone-50/60"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-display font-bold text-sm text-black uppercase tracking-wide">
            {review.reviewer_name || review.name || "Anonymous"}
          </p>
          {date && <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-1">{date}</p>}
        </div>
        <div className="flex items-center gap-0.5 flex-shrink-0">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={12}
              className={s <= Math.round(review.rating) ? "fill-accent text-accent" : "text-stone-200"}
            />
          ))}
        </div>
      </div>
      {review.title && (
        <p className="font-display font-bold text-sm text-black">{review.title}</p>
      )}
      <p className="text-stone-500 text-sm leading-relaxed">
        {review.body || review.comment || "No comment provided."}
      </p>
    </motion.div>
  );
}

export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6;

  // Write review form state
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [reviewForm, setReviewForm] = useState({ name: "", rating: 5, comment: "", title: "" });
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    if (productId) {
      setIsLoadingReviews(true);
      fetch(`/api/reviews/${productId}`)
        .then((r) => {
          if (!r.ok) throw new Error(`HTTP error! status: ${r.status}`);
          const contentType = r.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            throw new TypeError("Expected JSON response from server");
          }
          return r.json();
        })
        .then((data) => {
          const list = data?.data?.reviews || data?.reviews || data?.data || [];
          setReviews(Array.isArray(list) ? list : []);
        })
        .catch((err) => {
          console.error("Failed to fetch reviews:", err);
          setReviews([]);
        })
        .finally(() => setIsLoadingReviews(false));
    }
  }, [productId]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.comment) return;
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, ...reviewForm })
      });
      const contentType = res.headers.get("content-type");
      if (!res.ok || !contentType || !contentType.includes("application/json")) {
        throw new Error(`Failed to submit review: status ${res.status}`);
      }
      const data = await res.json();
      if (data.success !== false) {
        setSubmitStatus("success");
        setReviewForm({ name: "", rating: 5, comment: "", title: "" });
        setTimeout(() => {
          setShowForm(false);
          setSubmitStatus(null);
          fetch(`/api/reviews/${productId}`)
            .then(r => {
              if (!r.ok) throw new Error(`HTTP error! status: ${r.status}`);
              const cType = r.headers.get("content-type");
              if (!cType || !cType.includes("application/json")) {
                throw new TypeError("Expected JSON response from server");
              }
              return r.json();
            })
            .then(d => {
              const list = d?.data?.reviews || d?.reviews || d?.data || [];
              setReviews(Array.isArray(list) ? list : []);
            })
            .catch(err => console.error("Failed to refresh reviews:", err));
        }, 2000);
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      console.error("Submit review error:", err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0
    ? reviews.reduce((acc, r) => acc + Number(r.rating || 0), 0) / totalReviews
    : 0;
  const starDistribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => Math.round(r.rating) === star).length;
    return { star, count, percentage: totalReviews > 0 ? (count / totalReviews) * 100 : 0 };
  });
  const indexOfLast = currentPage * reviewsPerPage;
  const indexOfFirst = indexOfLast - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-2xl font-display font-bold text-black uppercase tracking-wider flex items-center gap-4">
          Customer Reviews
          <span className="text-sm text-stone-400 font-medium">({totalReviews})</span>
        </h3>
        <button
          onClick={() => setShowForm(f => !f)}
          className="px-8 py-4 bg-black text-white rounded-2xl text-[10px] font-display font-bold uppercase tracking-[0.2em] hover:bg-accent transition-all flex items-center gap-3"
        >
          <MessageSquare size={14} />
          {showForm ? "Cancel" : "Write a Review"}
        </button>
      </div>

      <div className="space-y-10">
        <AnimatePresence>
          {showForm && (
            <motion.form
              onSubmit={handleSubmitReview}
              initial={{ opacity: 0, y: -16, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -16, height: 0 }}
              transition={{ duration: 0.35 }}
              className="p-6 bg-stone-50 border border-black/5 rounded-2xl space-y-6 overflow-hidden"
            >
              <h4 className="font-display font-bold text-sm uppercase tracking-[0.2em] text-black">Your Review</h4>

              {/* Star picker */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Rating</p>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(s => (
                    <button
                      type="button"
                      key={s}
                      onMouseEnter={() => setHoverRating(s)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setReviewForm(f => ({ ...f, rating: s }))}
                      className="transition-transform hover:scale-110"
                    >
                      <Star size={28} className={s <= (hoverRating || reviewForm.rating) ? "fill-accent text-accent" : "text-stone-200"} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Your Name *</label>
                <input
                  type="text"
                  required
                  value={reviewForm.name}
                  onChange={e => setReviewForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="John Doe"
                  className="w-full px-5 py-4 bg-white border border-black/10 rounded-xl text-sm font-medium focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {/* Title (optional) */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Review Title <span className="text-stone-300">(optional)</span></label>
                <input
                  type="text"
                  value={reviewForm.title}
                  onChange={e => setReviewForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. Absolutely stunning timepiece"
                  className="w-full px-5 py-4 bg-white border border-black/10 rounded-xl text-sm font-medium focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {/* Comment */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Your Experience *</label>
                <textarea
                  required
                  rows={4}
                  value={reviewForm.comment}
                  onChange={e => setReviewForm(f => ({ ...f, comment: e.target.value }))}
                  placeholder="Share your honest experience with this timepiece..."
                  className="w-full px-5 py-4 bg-white border border-black/10 rounded-xl text-sm font-medium focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>

              {/* Status messages */}
              {submitStatus === "success" && (
                <div className="flex items-center gap-3 text-emerald-600 bg-emerald-50 px-5 py-4 rounded-xl">
                  <CheckCircle size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">Review submitted successfully!</span>
                </div>
              )}
              {submitStatus === "error" && (
                <div className="text-red-500 bg-red-50 px-5 py-4 rounded-xl text-xs font-bold uppercase tracking-widest">
                  Something went wrong. Please try again.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-black text-white rounded-2xl text-[10px] font-display font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-accent transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send size={14} />
                )}
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {isLoadingReviews ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : totalReviews === 0 ? (
          <div className="text-center py-20 border border-dashed border-black/10 rounded-[32px]">
            <MessageSquare size={40} className="text-stone-200 mx-auto mb-6" />
            <h3 className="text-xl font-display font-bold text-black uppercase tracking-wider mb-2">No Reviews Yet</h3>
            <p className="text-stone-400 text-sm">Be the first to share your experience with this timepiece.</p>
          </div>
        ) : (
          <>
            {/* Review Summary */}
            <div className="flex flex-col sm:flex-row gap-8 p-6 md:p-10 bg-stone-50 rounded-[32px] border border-black/5">
              {/* Average */}
              <div className="flex flex-col items-center sm:items-start justify-center gap-2 sm:pr-10 sm:border-r border-black/5">
                <p className="text-5xl font-display font-bold text-black">{avgRating.toFixed(1)}</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} className={s <= Math.round(avgRating) ? "fill-accent text-accent" : "text-stone-200"} />
                  ))}
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}</p>
              </div>
              {/* Distribution */}
              <div className="flex-1 space-y-3 flex flex-col justify-center">
                {starDistribution.map((d) => (
                  <div key={d.star} className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-stone-400 w-3">{d.star}</span>
                    <Star size={12} className="fill-accent text-accent flex-shrink-0" />
                    <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full transition-all duration-700" style={{ width: `${d.percentage}%` }} />
                    </div>
                    <span className="text-[10px] font-bold text-stone-400 w-6 text-right">{d.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Review Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {currentReviews.map((review, i) => (
                <ReviewCard key={review.id || i} review={review} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-6 py-3 border border-black/10 rounded-xl text-[10px] font-bold uppercase tracking-widest disabled:opacity-30 hover:bg-black hover:text-white transition-all"
                >
                  Prev
                </button>
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-6 py-3 border border-black/10 rounded-xl text-[10px] font-bold uppercase tracking-widest disabled:opacity-30 hover:bg-black hover:text-white transition-all"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
