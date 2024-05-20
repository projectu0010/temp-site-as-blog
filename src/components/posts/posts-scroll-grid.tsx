'use client';

import { useEffect, useRef, useState } from 'react';

import PostCard from '@/components/posts/post-card';
import usePosts from '@/hooks/use-posts';
import { Post } from '@/types/post';
import Slider from "react-slick";
import React, {} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

export default function PostsScrollGrid({ allPosts }: { allPosts: Post[] }) {
  const { posts, totalPages } = usePosts(allPosts);
  const rootRef = useRef<HTMLDivElement>(null);
  const [pageURL, setPageURL] = useState("");
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  useEffect(() => {
      /* Storing user's device details in a variable*/
        let details = navigator.userAgent;
       /* Creating a regular expression  
      containing some mobile devices keywords
      to search it in details string*/
      let regexp = /android|iphone|kindle|ipad/i;
      /* Using test() method to search regexp in details
      it returns boolean value*/
      let isMobileDevice = regexp.test(details);
  setIsMobileDevice(isMobileDevice);

  }, []);


 
  const settings = {
    className: "center",
    centerMode: true,
    infinite: false,
    centerPadding: "5px",
    slidesToShow: isMobileDevice ? Math.min(1, posts.length) : Math.min(3, posts.length),
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  
  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block"}}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block"}}
        onClick={onClick}
      />
    );
  }

  return (

    <Slider {...settings}>
        {posts.map((post) => (
            <div className='bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl' key={post.slug}>
              <PostCard post={post} />
            </div>
          ))}
        
        </Slider>
  );
}
