import React from 'react'
const companyLogos = [
  { name: 'Zoom', logo: '/zoom.png' },
  { name: 'Tinder', logo: '/tinder.png' },
  { name: 'Dribbble', logo: '/dribbble.png' },
  { name: 'Asana', logo: '/asana.png' },
];

function Map() {
  return (
    <>
        <div className="overflow-hidden rounded-xl border border-emerald-200 mt-2 relative h-70 bg-slate-200">
            <iframe
            title="Job Location Map"
            className="w-full h-full border-0"
            src="https://maps.google.com/maps?q=New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
            />
        </div>

        <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {companyLogos.map((company) => (
            <div
              key={company.name}
              className="flex items-center justify-center p-2 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
            >
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="h-8 md:h-10 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}

export default Map