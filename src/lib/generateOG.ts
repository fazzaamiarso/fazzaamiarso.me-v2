import { Cloudinary, Transformation } from "@cloudinary/url-gen";
import { source } from "@cloudinary/url-gen/actions/overlay";
import { image, text } from "@cloudinary/url-gen/qualifiers/source";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { max } from "@cloudinary/url-gen/actions/roundCorners";
import { Position } from "@cloudinary/url-gen/qualifiers/position";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
import { TextStyle } from "@cloudinary/url-gen/qualifiers/textStyle";
import { quality } from "@cloudinary/url-gen/actions/delivery";
import { Quality } from "@cloudinary/url-gen/qualifiers";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dkiqn0gqg",
  },
});

const generateTitle = (title: string) => {
  return source(
    text(
      title,
      new TextStyle("helvetica", 60).fontWeight("bold").fontStyle("normal").textAlignment("left")
    ).textColor("#FFFFFF")
  ).position(new Position().gravity(compass("south_west")).offsetX(50).offsetY(150));
};

export const generateOgImage = ({ title, publishDate }: { title: string; publishDate: string }) => {
  const ogBase = cld.image("og-base");
  const titleText = generateTitle(title);

  const OgImage = ogBase
    .overlay(
      source(
        image("twitter_name/faz_razq").transformation(
          new Transformation().resize(scale().width(100)).roundCorners(max())
        )
      ).position(new Position().gravity(compass("north_west")).offsetX(50).offsetY(50))
    )
    .overlay(
      source(
        text(
          publishDate,
          new TextStyle("helvetica", 24).fontStyle("normal").textAlignment("left")
        ).textColor("#d4d4d8")
      ).position(new Position().gravity(compass("south_west")).offsetX(50).offsetY(50))
    )
    .addTransformation(`w_850,c_fit,${titleText.toString()}`)
    .format("auto")
    .delivery(quality(Quality.auto()));

  return OgImage.toURL();
};
