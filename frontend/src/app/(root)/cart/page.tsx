import { getSettings } from '@/utils/actions/content.actions';
import CartComp from '@/components/Cart'


export async function generateMetadata() {
  const settings = await getSettings();

  return {
    title: `${settings.site_name} | Cart`,
  }
}

const Cart = () => {
  <CartComp />
}

export default Cart