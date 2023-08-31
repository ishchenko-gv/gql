import { Author } from "../../common/types";

type Props = {
  author: Author;
};

export default function AuthorCard(props: Props) {
  const { name, photoImgUrl } = props.author;

  return (
    <div className="inline-flex items-center hover:underline">
      <img
        src={photoImgUrl}
        className="rounded-full"
        width="80"
        height="80"
        alt=""
      />
      <span className="block ml-4 text-lg">{name}</span>
    </div>
  );
}
