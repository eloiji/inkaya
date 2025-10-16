export default function About() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center p-8 sm:p-24">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">About Inkaya</h1>
        
        <div className="space-y-6 text-lg">
          <p>
            Welcome to Inkaya, your premier destination for personalized print-on-demand products. 
            We specialize in transforming your creative ideas into high-quality digital products 
            that you can proudly display or gift to loved ones.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">What We Offer</h2>
          <p>
            At Inkaya, we offer a wide range of customizable digital products including custom 
            artwork, personalized designs, and unique print-ready files. Whether you're looking 
            for wall art, greeting cards, invitations, or branded materials, we have the tools 
            and expertise to bring your vision to life.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p>
            Our mission is to empower individuals and businesses to express their creativity 
            through accessible, high-quality print-on-demand solutions. We believe that everyone 
            deserves access to professional-grade design services without the traditional barriers 
            of cost and complexity.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose Inkaya?</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Instant digital delivery - Get your products immediately after purchase</li>
            <li>Customizable designs - Tailor every detail to your preferences</li>
            <li>High-quality files - Print-ready formats optimized for the best results</li>
            <li>Eco-friendly approach - Digital products mean zero waste and minimal environmental impact</li>
            <li>Affordable pricing - Professional quality without the premium price tag</li>
          </ul>
          
          <p className="mt-8">
            Join thousands of satisfied customers who have discovered the convenience and quality 
            of Inkaya's print-on-demand digital products. Start creating something amazing today!
          </p>
        </div>
      </div>
    </section>
  );
}
