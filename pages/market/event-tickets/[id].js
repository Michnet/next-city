import TicketProduct from "@/components/UI/market/singleProducts/TicketProduct";
import SiteHead from "@/components/UI/SiteHead";
import { fetchIdsUrl } from "@/helpers/rest";
import { fetchProductUrl } from "@/helpers/WooRest";
//import SiteHead from "appComponents/components/profile/webTweaks/SiteHead";
// import TicketProduct from "~/routes/market/products/TicketProduct";

//Static Paths
export async function getStaticPaths() {
  const res = await fetch(fetchIdsUrl({ type: "product", product_type : 'booking' }));
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
      headerTitle: pdt.name,
      seoMeta:{title: pdt.name},
      pdt,
    },
    revalidate: 6000, // In seconds
  };
}

const Product = ({ pdt }) => {

  return (
    <>
      <SiteHead
        title={pdt.name.replace(/&amp;/g, "&")}
        description={pdt.short_description
          .replace(/(<([^>]+)>)/gi, "")
          .replace(/&amp;/g, "&")}
        image={pdt?.images[0]?.src}
      />
      <div className={`page-content single_product`}>
        <TicketProduct product={pdt} />
      </div>
    </>
  );
};

export default Product;
