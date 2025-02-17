import FAQ from "@/components/FAQ";
import Brands from "@/components/Brands";
import Categories from "@/components/Categories";
import ContactForm from "@/components/ContactForm";
import ProductSlider from "@/components/ProductSlider";
import Slider from "@/components/Slider";
// Actions
import { getBanners, getFAQ, getSettings } from "@/utils/actions/content.actions";
import { getBrands, getCategories, getProducts } from "@/utils/actions/product.actions";

export default async function Home() {
  const banners = await getBanners()

  const products = await getProducts()

  const categories = await getCategories()

  const brands = await getBrands()

  const faq = await getFAQ()

  const settings = await getSettings();

  return (
    <main className="container relative my-8 space-y-10 z-10">
      <Slider banners={banners} />
      <ProductSlider products={products.results} title="Newest Products" />
      <Categories categories={categories} />
      <ProductSlider products={products.results} title="Special Sale" />
      <Brands brands={brands} />
      <ContactForm settings={settings} />
      <FAQ faq={faq} />
    </main>
  );
}