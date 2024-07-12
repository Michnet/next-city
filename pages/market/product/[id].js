import ProductBottomMenu from "@/components/UI/market/partials/ProductBottomMenu";
import SimpleProduct from "@/components/UI/market/singleProducts/SimpleProduct";
import SiteHead from "@/components/UI/SiteHead";
import { fetchIdsUrl } from "@/helpers/rest";
import { fetchProductUrl } from "@/helpers/WooRest";
import { useRouter } from "next/router";
//import SiteHead from "appComponents/components/profile/webTweaks/SiteHead";
// import SimpleProduct from "~/routes/market/products/SimpleProduct";

//Static Paths
export async function getStaticPaths() {
  const res = await fetch(fetchIdsUrl({ type: "product", product_type : 'simple' }));
  const data = await res.json();
  const paths = data.map((item) => {
    return {
      params: { id: `${item}` },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}

//Static Props

export async function getStaticProps({ params }) {
  const singleRes = await fetch(fetchProductUrl(params.id));

  const pdt = await singleRes.json();

  return {
    props: {
      headerTitle: pdt.name.replace(/&amp;/g, "&"),
      seoMeta:{
        title: pdt.name.replace(/&amp;/g, "&"),
        description : pdt.short_description
          .replace(/(<([^>]+)>)/gi, "")
          .replace(/&amp;/g, "&"),
        image: pdt?.images[0]?.src
      },
      pdt,
      settings : {
         noFooter: true,
         pageClass: '_product _simple',
         mMenu: 'show',
         mMenuContent:{
           icon : 'fas fa-ellipsis-h', 
           btnProps:{
           'data-menu' : "listingActions"}
           
       },
       //noHeader: true
     },
    },
    revalidate: 6000, // In seconds
  };
}

const Product = ({ pdt }) => {
  const router = useRouter();

  return (
    <>
      {/* <SiteHead
        title={pdt.name.replace(/&amp;/g, "&")}
        description={pdt.short_description
          .replace(/(<([^>]+)>)/gi, "")
          .replace(/&amp;/g, "&")}
        image={pdt?.images[0]?.src}
      /> */}
      <div className={`page-content single_product`}>
        <SimpleProduct product={pdt} />
      </div>
      <ProductBottomMenu product={pdt} router={router}/>
    </>
  );
};

export default Product;
