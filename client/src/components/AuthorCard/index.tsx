import { Author } from "../../common/author/types";

type Props = {
  author: Author;
};

export default function AuthorCard(props: Props) {
  const { name, photoImgUrl } = props.author;

  return (
    <div
      className="
      card 
      bg-gray-800
      shadow-lg 
      hover:-translate-y-1 
      hover:shadow-2xl 
      hover:text-accent
      transition-all 
      duration-200
      ease-out
    "
    >
      <div className="card-body p-6">
        <div className="inline-flex items-center">
          <img
            src={photoImgUrl}
            className="shrink-0 rounded-full"
            width="80"
            height="80"
            alt=""
          />
          <span className="block ml-4 text-lg">{name}</span>
        </div>
      </div>
    </div>
  );
}
