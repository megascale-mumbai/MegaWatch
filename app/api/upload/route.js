import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { success: false, error: "No file provided." },
        { status: 400 }
      );
    }

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/gif",
      "image/svg+xml",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Invalid file type. Only images are allowed." },
        { status: 400 }
      );
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: "File too large. Maximum size is 5 MB." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const safeName = (file.name || "upload").replace(/[^a-zA-Z0-9._-]/g, "_");
    const filename = `${Date.now()}-${safeName}`;

    let url;
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(filename, buffer, {
        access: "public",
        contentType: file.type || "application/octet-stream",
      });
      url = blob.url;
    } else {
      return NextResponse.json(
        {
          success: false,
          error:
            "Image storage is not configured on Vercel. Add BLOB_READ_WRITE_TOKEN to enable uploads.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, url }, { status: 200 });
  } catch (err) {
    console.error("Upload API Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error during upload." },
      { status: 500 }
    );
  }
}
