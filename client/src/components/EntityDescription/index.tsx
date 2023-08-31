type Props = {
  title: string;
  description: string;
  imgUrl: string;
};

export default function EntityDescription(props: Props) {
  const { title, description, imgUrl } = props;

  return (
    <div className="flex">
      <img
        src={imgUrl}
        alt=""
        width="240"
        className="block shrink-0 self-start rounded-md"
      />
      <div className="ml-8">
        <h2 className="text-4xl">{title}</h2>
        <p className="mt-8">{description}</p>
      </div>
    </div>
  );
}
