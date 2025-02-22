
import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const fetchNews = async (pageNumber = 1) => {
        props.setProgress(10);
        const url = 'https://google.serper.dev/news';
        const apiKey = process.env.REACT_APP_SERPER_API;

        if (!apiKey) {
            console.error('API key is missing. Please check your .env file.');
            return;
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': apiKey
            },
            body: JSON.stringify({
                q: props.category,
                num: props.pageSize, // Number of results per request
                page: pageNumber
            }) // Search by category
        };

        setLoading(true);
        try {
            const response = await fetch(url, options);
            props.setProgress(30);
            const data = await response.json();
            props.setProgress(70);
            console.log('Fetched News Data:', data);

            if (data.news) {
                setArticles((prevArticles) =>
                    pageNumber === 1 ? data.news : [...prevArticles, ...data.news]
                );

                // Update totalResults only if it's the first page
                if (pageNumber === 1) {
                    setTotalResults(data.news.length * 10); // Approximate max results
                }

                setPage(pageNumber); // Update the page state correctly
            }
        } catch (error) {
            console.error('Error fetching news:', error);
        }
        setLoading(false);
        props.setProgress(100);
    };

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
        fetchNews(1);
    }, [props.category]);

    const fetchMoreData = async () => {
        const nextPage = page + 1;
        console.log('Fetching more news for page:', nextPage);
        await fetchNews(nextPage);
    };

    return (
        <>
            <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>
                Top {capitalizeFirstLetter(props.category)} Headlines
            </h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < totalResults} // ✅ Corrected condition
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element, index) => (
                            <div className="col-md-3 col-sm-6 col-12 mb-3" key={element.link || index}>
                                <NewsItem
                                    title={element.title ? element.title : ''}
                                    description={element.section ? element.section : 'news'}
                                    imageUrl={element.imageUrl}
                                    newsUrl={element.link}
                                    author={element.author}
                                    date={element.date}
                                    source={element.source}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    );
};

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    setProgress: PropTypes.func.isRequired
};

export default News;

// import React, { useEffect, useState } from 'react'
// import NewsItem from './NewsItem'
// import Spinner from './Spinner';
// import PropTypes from 'prop-types'
// import InfiniteScroll from "react-infinite-scroll-component";

// const News = (props) => {
//     const [articles, setArticles] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [page, setPage] = useState(1)
//     const [totalResults, setTotalResults] = useState(0)

//     const capitalizeFirstLetter = (string) => {
//         return string.charAt(0).toUpperCase() + string.slice(1);
//     }



//     const fetchNews = async (pageNumber = 1) => {

//         props.setProgress(10);
//         const url = "https://google.serper.dev/news";
//         const apiKey = process.env.REACT_APP_SERPER_API;

//         if (!apiKey) {
//             console.error("API key is missing. Please check your .env file.");
//             return;
//         }


//         const options = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "X-API-KEY": apiKey
//             },
//             body: JSON.stringify({
//                 q: props.category,
//                 num: props.pageSize, // Number of results per request
//                 page: pageNumber,
//             }) // Search by category
//         };

//         setLoading(true);
//         try {
//             const response = await fetch(url, options);
//             props.setProgress(30);
//             const data = await response.json();
//             props.setProgress(70);
//             console.log("Fetched News Data:", data);

//             if (data.news) {
//                 setArticles((prevArticles) =>
//                     pageNumber === 1 ? data.news : [...prevArticles, ...data.news]
//                 );
//                 setTotalResults(data.credits * props.pageSize);
//                 setPage(pageNumber);
//             }

//         } catch (error) {
//             console.error("Error fetching news:", error);
//         }
//         setLoading(false);
//         props.setProgress(100);
//     };



//     // const updateNews = async ()=> {
//     //     props.setProgress(10);
//     //     const url = `https://google.serper.dev/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`; 
//     //     setLoading(true)
//     //     let data = await fetch(url);
//     //     props.setProgress(30);
//     //     let parsedData = await data.json()
//     //     props.setProgress(70);
//     //     setArticles(parsedData.articles)
//     //     setTotalResults(parsedData.totalResults)
//     //     setLoading(false)
//     //     props.setProgress(100);
//     // }




//     useEffect(() => {
//         document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
//         // updateNews(); 
//         // eslint-disable-next-line
//         fetchNews(1);
//     }, [props.category])


//     const fetchMoreData = async () => {
//         // setPage(page + 1);
//         const nextPage = page + 1; // Increment page first
//         console.log("Fetching more news for page:", nextPage);
//         await fetchNews(nextPage);
//         // await fetchNews(page + 1);
//     };

//     // const fetchMoreData = async () => {   
//     //     const url = `https://google.serper.dev/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
//     //     setPage(page+1) 
//     //     let data = await fetch(url);
//     //     let parsedData = await data.json()
//     //     setArticles(articles.concat(parsedData.articles))
//     //     setTotalResults(parsedData.totalResults)
//     //   };

//     return (
//         <>
//             <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
//             {loading && <Spinner />}
//             <InfiniteScroll
//                 dataLength={articles.length}
//                 next={fetchMoreData}
//                 hasMore={articles.length !== totalResults}
//                 loader={<Spinner />}
//             >
//                 <div className="container">

//                     <div className="row">
//                         {articles.map((element) => {
//                             return <div className="col-md-4" key={element.link}>
//                                 <NewsItem title={element.title ? element.title : ""}
//                                     description={element.section ? element.section : "news"}
//                                     imageUrl={element.imageUrl}
//                                     newsUrl={element.link}
//                                     author={element.author}
//                                     date={element.date}
//                                     source={element.source} />
//                             </div>
//                         })}
//                     </div>
//                 </div>
//             </InfiniteScroll>
//         </>
//     )

// }


// News.defaultProps = {
//     country: 'in',
//     pageSize: 8,
//     category: 'general',
// }

// News.propTypes = {
//     country: PropTypes.string,
//     pageSize: PropTypes.number,
//     category: PropTypes.string,
//     setProgress: PropTypes.func.isRequired

// }

// export default News