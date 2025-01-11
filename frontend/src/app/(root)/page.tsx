import Accordion from "@/components/Accordion";
import Categories from "@/components/Categories";
import ContactForm from "@/components/ContactForm";
import ProductSlider from "@/components/ProductSlider";
import Slider from "@/components/Slider";

export default function Home() {
  const sliders = [
    { id: 1, url: 'https://google.com', image: 'https://random-image-pepebigotes.vercel.app/api/random-image' },
    { id: 2, url: 'https://google.com', image: 'https://random-image-pepebigotes.vercel.app/api/random-image' },
    { id: 3, url: 'https://google.com', image: 'https://random-image-pepebigotes.vercel.app/api/random-image' },
    { id: 4, url: 'https://google.com', image: 'https://random-image-pepebigotes.vercel.app/api/random-image' }
  ]

  const products = [
    { id: 1, slug: 'p_1', stars: 5, name: 'Product 1', image: 'https://random-image-pepebigotes.vercel.app/api/random-image', price: 30000 },
    { id: 2, slug: 'p_2', stars: 2, name: 'Product 2', image: 'https://random-image-pepebigotes.vercel.app/api/random-image', price: 30000 },
    { id: 3, slug: 'p_3', stars: 3, name: 'Product 3', image: 'https://random-image-pepebigotes.vercel.app/api/random-image', price: 30000 },
    { id: 4, slug: 'p_4', stars: 5, name: 'Product 4', image: 'https://random-image-pepebigotes.vercel.app/api/random-image', price: 30000 },
    { id: 5, slug: 'p_5', stars: 4, name: 'Product 5', image: 'https://random-image-pepebigotes.vercel.app/api/random-image', price: 30000 },
    { id: 6, slug: 'p_6', stars: 3, name: 'Product 6', image: 'https://random-image-pepebigotes.vercel.app/api/random-image', price: 30000 }
  ]

  const categories = [
    { id: 1, slug: 'p_1', stars: 5, name: 'Product 1', image: 'https://random-image-pepebigotes.vercel.app/api/random-image', price: 30000 },
    { id: 2, slug: 'p_2', stars: 2, name: 'Product 2', image: 'https://random-image-pepebigotes.vercel.app/api/random-image', price: 30000 },
    { id: 3, slug: 'p_3', stars: 3, name: 'Product 3', image: 'https://random-image-pepebigotes.vercel.app/api/random-image', price: 30000 },
    { id: 4, slug: 'p_4', stars: 5, name: 'Product 4', image: 'https://random-image-pepebigotes.vercel.app/api/random-image', price: 30000 },
    { id: 5, slug: 'p_5', stars: 4, name: 'Product 5', image: 'https://random-image-pepebigotes.vercel.app/api/random-image', price: 30000 },
    { id: 6, slug: 'p_6', stars: 3, name: 'Product 6', image: 'https://random-image-pepebigotes.vercel.app/api/random-image', price: 30000 }
  ]

  return (
    <>
      <Slider sliders={sliders} />
      <ProductSlider products={products} title="Newest Products" />
      <Categories categories={categories} />
      <ProductSlider products={products} title="Special Sale" />
      <Accordion />
      <ContactForm />
    </>
  );
}