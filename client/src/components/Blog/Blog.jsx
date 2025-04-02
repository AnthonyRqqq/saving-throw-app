import { useQuery } from "@apollo/client";
import { GET_BLOG_POSTS } from "../../utils/queries";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import './Blog.css'

export default function Blog() {
  const { data, loading } = useQuery(GET_BLOG_POSTS);

  useEffect(() => {
    console.log(data);
  }, [data, loading]);

  if (loading && !data) {
    return (
      <div>
        <Spinner animation="border" />
      </div>
    );
  }
  return (
    <div className="blog">
      {data.blogPosts.map((post) => (
        <div key={post._id}>
          <h4 className="blogHeader">{post.title}</h4>
          <div className="blogBody">{post.body}</div>
          <div className="blogNotes">
            <ul>
              {post.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
          <div className="blogDate">
            {new Date(post.date).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
