import BannerProduct from '../components/admin/BannerProduct'
import CategoryList from '../components/admin/CategoryList'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'
export default function Home() {
  return (
    <>
      <CategoryList />
      <BannerProduct />

        <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>
        <HorizontalCardProduct category={"watches"} heading={"Popular's Watches"}/>

        <VerticalCardProduct category={"mobiles"} heading={"Mobiles"}/>
        <VerticalCardProduct category={"Mouse"} heading={"Mouse"}/>
        <VerticalCardProduct category={"televisions"} heading={"Televisions"}/>
        <VerticalCardProduct category={"camera"} heading={"Camera & Photography"}/>
        <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"}/>
        <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"}/>
        <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"}/>
        <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/>
    </>
  )
}
