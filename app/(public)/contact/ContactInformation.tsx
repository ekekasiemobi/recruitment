import Image from "next/image"
import image from "../../(public)/images/Map.png"
import {
  Mail,
  MapPin,
  Phone,
  TimerIcon,
} from "lucide-react";

const contactDetails = [
  {
    icon: Mail,
    title: "Email Us",
    value: "info@example.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+234 800 000 0000",
    
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "Lagos, Nigeria",
    
  },
  {
    icon: TimerIcon,
    title: "Opening hours",
    value: "9AM-4PM Mon-Fri"
  },
];

export default function ContactInformation() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          
          {/* Left */}
          <div>

            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#171717] sm:text-4xl">
              We'd Love To Hear From You
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-gray-500">
              Whether you have a question, need assistance, or want
              to learn more about our services, our team is here to
              help.
            </p>

            {/* Contact details */}
            <div className="grid grid-cols-1-center gap-3 sm:grid-cols-2 lg:grid-cols-2 mt-8 space-y-5">
              {contactDetails.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.title}
                    className="group flex items-center gap-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[#159a8c] transition-colors group-hover:bg-[#159a8c] group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        {item.title}
                      </p>

                      <p className="mt-1 text-sm font-medium text-[#171717] transition-colors group-hover:text-[#159a8c]">
                        {item.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      
    </section>
    

  );
}