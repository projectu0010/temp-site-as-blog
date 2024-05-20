'use client';

import { useRef } from 'react';

import PostCard from '@/components/posts/post-card';
import usePosts from '@/hooks/use-posts';
import { Post } from '@/types/post';
import Slider from "react-slick";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

export default function PostsScrollGrid({ allPosts }: { allPosts: Post[] }) {
  const { posts, totalPages } = usePosts(allPosts);
  const rootRef = useRef<HTMLDivElement>(null);
  /* Storing user's device details in a variable*/
  let details = navigator.userAgent; 
    
  /* Creating a regular expression  
  containing some mobile devices keywords  
  to search it in details string*/
  let regexp = /android|iphone|kindle|ipad/i; 
    
  /* Using test() method to search regexp in details 
  it returns boolean value*/
  let isMobileDevice = regexp.test(details); 
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "5px",
    slidesToShow: isMobileDevice ? 1 : 3,
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
    <div className="slider-container">
        <Slider {...settings}>
        {posts.map((post) => (
            <div className='bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl' key={post.slug}>
              <PostCard post={post} />
            </div>
          ))}
        
        </Slider> </div>
  );
}
