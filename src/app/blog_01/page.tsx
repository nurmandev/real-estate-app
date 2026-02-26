import BlogOne from "@/components/blogs/blog-one";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Blog One OMNIS - Real Estate React Next js",
};
const index = () => {
   return (
      <Wrapper>
         <BlogOne />
      </Wrapper>
   )
}

export default index