import { gql, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";

import BooksGrid from "../../components/BooksGrid";
import Pagination from "../../components/Pagination";

const PAGE_SIZE = 20;

const GET_BOOKS = gql`
  query getBooks($page: Int) {
    books(page: $page, pageSize: ${PAGE_SIZE}) {
      items {
        _id
        title
        authors {
          _id
          name
        }
        coverImgUrl
      }
      totalCount
    }
  }
`;

export default function BooksPage() {
  const navigate = useNavigate();
  const { page } = useParams();
  const pageNum = Number(page);

  const { loading, error, data } = useQuery(GET_BOOKS, {
    variables: { page: pageNum },
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <BooksGrid books={data.books.items} />
      <div className="flex justify-center mt-8">
        <Pagination
          currentPage={pageNum}
          isPrevBtnDisabled={pageNum === 1}
          isNextBtnDisabled={
            pageNum === Math.ceil(data.books.totalCount / PAGE_SIZE)
          }
          onPrevClick={() => navigate(`/books/${pageNum - 1}`)}
          onNextClick={() => navigate(`/books/${pageNum + 1}`)}
        />
      </div>
    </>
  );
}
