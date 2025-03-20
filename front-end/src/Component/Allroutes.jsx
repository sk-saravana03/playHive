import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Search from '../Pages/Search/Search'
import Videopage from '../Pages/VideoPage/VideoPage'
import Channel from '../Pages/Channel/Channel'
import Library from '../Pages/Library/Library'
import Likedvideo from '../Pages/LikedVideo/LikedVideo'
import Watchhistory from '../Pages/WatchHistory/WatchHistory'
import Watchlater from '../Pages/WatchLater/WatchLater'
import Yourvideo from '../Pages/YourVideo/YourVideo'
import VideoCall from '../Pages/VideoCall/VideoCall'
import Explore from '../Pages/Explore/Explore'
import Subscription from '../Pages/Subscription/Subscription'
import Shorts from '../Pages/Shorts/Shorts'
import Dashboard from '../Pages/Dashboard/Dashboard'
import TicTacToe from '../Component/Games/TicTacToe'
import SnakeGame from '../Component/Games/Snakegame'
import DotsAndBoxes from '../Component/Games/DotsAndBoxes'
import Sudoku from '../Component/Games/Sudoku'
import Game2048 from '../Component/Games/Game2048'

const Allroutes = ({ seteditcreatechanelbtn , setvideouploadpage }) => {
  return (
    <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path='/search/:searchquery' element={<Search />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/shorts' element={<Shorts/> }/>
        <Route path='/Subscription' element={<Subscription/> }/>
        <Route path='/videopage/:vid' element={<Videopage/>}/>
        <Route path='/Library' element={<Library/>}/>
        <Route path='/Likedvideo' element={<Likedvideo/>}/>
        <Route path='/Watchhistory' element={<Watchhistory/>}/>
        <Route path='/Watchlater' element={<Watchlater/>}/>
        <Route path='/Yourvideo' element={<Yourvideo />} />
        <Route path="/videocall" element={<VideoCall />} />
        <Route path='/channel/:cid' element={<Channel seteditcreatechanelbtn={seteditcreatechanelbtn} setvideouploadpage={setvideouploadpage} />} />
        <Route path='/dashboard/:userId' element={<Dashboard />} />
        <Route path='/tictactoe' element={<TicTacToe />} />
        <Route path='/snakegame' element={<SnakeGame />} />
        <Route path='/game2048' element={<Game2048 />} />
        <Route path='/dotsandboxes' element={<DotsAndBoxes />} />
        <Route path='/sudoku' element={<Sudoku />} />
      


    </Routes>
  )
}

export default Allroutes