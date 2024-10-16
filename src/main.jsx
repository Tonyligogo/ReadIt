import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import Home from './pages/Home.jsx'
import AuthProvider from './context/AuthContext.jsx'
import QueryProvider from './lib/react-query/QueryProvider.jsx'
import CreateCommunity from './pages/r/CreateCommunity.jsx'
import Communities from './pages/communities/Communities.jsx'
import CommunityPosts from './pages/communities/community/[communityName]/CommunityPosts.jsx'
import CreatePost from './pages/communities/community/[communityName]/CreatePost.jsx'
import EditPost from './pages/EditPost.jsx'
import PostDetails from './pages/PostDetails.jsx'
import Explore from './pages/Explore.jsx'

const router = createBrowserRouter([
  {
    element: <App/>,
    children:[
      {
        path: '/',
        element: <Home/>,
        children:[
          {
            path: '/gaming',
            element: <h1>Gaming</h1>,
          },
          {
            path: '/internet-culture',
            element: <h1>Internet culture</h1>,
          },
          
          {
            path: '/tech',
            element: <h1>Tech</h1>,
          },
          {
            path: '/pop-culture',
            element: <h1>Pop culture</h1>,
          },
          {
            path: '/movies-and-tv',
            element: <h1>Movies & TV</h1>,
          },
          {
            path: '/communities',
            element: <Communities/>,
          },
          {
            path: '/r/create-community',
            element: <CreateCommunity/>
          },
          {
            path: '/communities/:communityName/:communityId',
            element: <CommunityPosts/>
          },
          {
            path: '/communities/:communityName/create-post/:communityId',
            element: <CreatePost/>
          },
          {
            path: '/update-post/:postId',
            element: <EditPost/>
          },
          {
            path: '/post/:postId',
            element: <PostDetails/>
          },
          {
            path: '/explore',
            element: <Explore/>
          },
        ]
      },
    ]
  },
  {
    path: '*',
    element: <h1 className='text-black'>This page does not exist!</h1>,
  },
]) 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryProvider>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position='top-right'/>
    </AuthProvider>
    </QueryProvider>
  </React.StrictMode>
)
