import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import useVideoList from "../hooks/useVideoList";
import Video from "./Video";

export default function Videos() {
    const [page, setPage] = useState(1);
    const { loading, error, hasMore, videos } = useVideoList(page);

    return (
        <div>
            {videos.length > 0 && (
                <InfiniteScroll
                    dataLength={videos.length}
                    hasMore={hasMore}
                    next={() => setPage(page + 12)}
                    loader="Loading..."
                >
                    {videos.map((video, index) =>
                        video.noq > 0 ? (
                            <Link to="/quiz" key={video.youtubeID + index}>
                                <Video
                                    id={video.youtubeID}
                                    title={video.title}
                                    noq={video.noq}
                                />
                            </Link>
                        ) : (
                            <Video
                                id={video.youtubeID}
                                title={video.title}
                                noq={video.noq}
                            />
                        )
                    )}
                </InfiniteScroll>
            )}

            {!loading && !error && videos.length === 0 && (
                <div>No data found!</div>
            )}
            {loading && <div>Loading...</div>}
            {error && <div>Failed to fetch data!</div>}
        </div>
    );
}
