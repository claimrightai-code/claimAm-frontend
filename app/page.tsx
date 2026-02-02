import { Metadata } from "next";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/header/header-two";
import HeroBannerTwo from "@/custom/hero-banner/hero-banner-two";
import FancyBannerOne from "@/custom/fancy-banner/fancy-banner-one";
import FancyBannerTwo from "@/custom/fancy-banner/fancy-banner-two";
import BlockFeatureOne from "@/custom/block-feature/block-feature-one";
import BlockFeatureTwo from "@/custom/block-feature/block-feature-two";
import BlockFeatureThree from "@/custom/block-feature/block-feature-three";
import TextFeatureOne from "@/custom/text-feature/text-feature-one";
import FeedbackOne from "@/custom/feedback/feedback-one";
import TeamSectionOne from "@/custom/team/team-section-one";
import FaqSectionOne from "@/custom/faq/faq-section-one";
import HomeTwoBlogs from "@/custom/blogs/home-2-blogs";
import FooterOne from "@/layout/footer/footer-one";
import Platform from "@/layout/platformpage";

export const metadata: Metadata = {
  title: "ClaimAm | Claim an insurance within minutes",
};

export default function HomePageTwo() {
  return (
    <Wrapper>
      <div className="main-page-wrapper ">
        <Platform />
        {/* header start */}
        {/* <HeaderTwo /> */}
        {/* header end */}
        {/* <main> */}
        {/* hero banner start */}
        {/* <HeroBannerTwo /> */}
        {/* hero banner end */}

        {/* fancy banner one start */}
        {/* <FancyBannerOne /> */}
        {/* fancy banner one end */}

        {/* block feature one start */}
        {/* <BlockFeatureOne /> */}
        {/* block feature one end */}

        {/* text feature one start */}
        {/* <TextFeatureOne /> */}

        {/* text feature one end */}

        {/* block feature two start */}
        {/* <BlockFeatureTwo /> */}
        {/* block feature two end */}

        {/* block feature three start */}

        {/* <BlockFeatureThree /> */}
        {/* block feature three end */}

        {/* feedback one start */}

        {/* feedback one end */}

        {/* team section one start */}
        {/* <TeamSectionOne /> */}
        {/* team section one end */}

        {/* <FeedbackOne /> */}

        {/* faq section start */}
        {/* <FaqSectionOne /> */}
        {/* faq section end */}

        {/* blog item start */}
        {/* <HomeTwoBlogs /> */}
        {/* blog item end */}

        {/* fancy banner two start */}
        {/* <FancyBannerTwo /> */}
        {/* fancy banner two end */}
        {/* </main> */}

        {/* footer start */}
        {/* <FooterOne /> */}
        {/* footer end */}
      </div>
    </Wrapper>
  );
}
