import { Plane, Truck, Award, Lock } from "lucide-react";

export default function FeaturesBanner() {
  const features = [
    {
      icon: <Plane size={24} strokeWidth={1.5} />,
      title: "EXPRESS SHIPPING",
    },
    {
      icon: <Truck size={24} strokeWidth={1.5} />,
      title: "10-DAY RETURN POLICY*",
    },
    {
      icon: <Award size={24} strokeWidth={1.5} />,
      title: "1-YEAR* WARRANTY",
    },
    {
      icon: <Lock size={24} strokeWidth={1.5} />,
      title: "100% SECURE CHECKOUT",
    },
  ];

  return (
    <div className="w-full bg-[#f6f6f6] py-12 mt-20 border-y border-black/5">
      <div className="w-full px-6 md:px-12">
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-8 md:gap-12 lg:gap-16 xl:gap-40">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center gap-4 text-center"
            >
              <div className="text-black">{feature.icon}</div>
              <span className="text-[11px] md:text-[10px] font-bold text-black uppercase tracking-[0.15em] whitespace-nowrap">
                {feature.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
