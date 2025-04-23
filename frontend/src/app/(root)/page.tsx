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
  let banners = []
  let products = { results: [] }
  let categories = []
  let brands = []
  let faq = []
  let settings = []

  try {
    const results = await Promise.allSettled([
      getBanners(),
      getProducts(),
      getCategories(),
      getBrands(),
      getFAQ(),
      getSettings(),
    ]);

    if (results[0].status === "fulfilled") banners = results[0].value;
    if (results[1].status === "fulfilled") products = results[1].value;
    if (results[2].status === "fulfilled") categories = results[2].value;
    if (results[3].status === "fulfilled") brands = results[3].value;
    if (results[4].status === "fulfilled") faq = results[4].value;
    if (results[5].status === "fulfilled") settings = results[5].value;
  } catch (err) {
    console.error("Error in homepage data fetch:", err);
    // optionally show fallback UI
  }

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
