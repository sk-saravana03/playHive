import React from 'react'
import Showvideolist from '../Showvideolist/Showvideolist'
const WHLvideolist = ({ page, currentuser, videolist }) => {
    // console.log(currentuser)
    const uniqueVideos = Array.from(
        new Set(
          videolist?.data
            .filter((q) => q?.viewer === currentuser)
            .map((m) => m.videoid) // Extract only video IDs
        )
      ).map((videoid) => 
        videolist?.data.find((m) => m.videoid === videoid) // Find the first instance of each unique videoid
      );
    return (
        <>
            {currentuser ? (
                <>
                    {
                        uniqueVideos.map((m) => (
                            <Showvideolist videoid={m?.videoid} key={m?._id} />
                        ))
                    }

                </>
            ) : (
                <>

                    <h2 style={{ color: "white" }}>Please login to Watch your {page}</h2>
                </>
            )}
        </>
    )
}

export default WHLvideolist