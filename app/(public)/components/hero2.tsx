interface Hero2Props {
  title: string;
  
}

export default function Hero2({ title }: Hero2Props) {
  return (
    <section className="w-full bg-black py-16 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          {title}
        </h1>
      </div>
    </section>
  )
}