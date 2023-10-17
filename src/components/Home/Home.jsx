
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts.jsx";
import CategorySlider from "../CategorySlider/CategorySlider.jsx";
import MainSlider from "../MainSlider/MainSlider.jsx";

function Home() {


  /*  useEffect(() => {
    getAllProducts();
  }, []);

  async function getAllProducts() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setProducts(data.data);
  } */
  return (
    <>
      <MainSlider />
      <CategorySlider />
      <FeaturedProducts />
    </>
  );
}
export default Home;
