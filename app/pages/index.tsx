import React from 'react'
import { NextPage } from 'next'
// import nookies from 'nookies'
import Head from 'next/head'
import { AuthLayout } from '@/features/user-auth/layout'
// import { HomePageLanding, HomePageDashboard } from '@/features/home'
// import { useSessionManager } from '@/features/common/context/session'
// import { ApolloContext } from '@/features/common/context/apollo'

// type HomePageProps = {
//   userExpected: boolean
// }

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>NodePen</title>
        <meta
          name="description"
          content="NodePen is a web client for Grasshopper, the visual programming language for Rhino 3D. Same Grasshopper, new digs. Powered by Rhino
          Compute."
        />
        <meta name="keywords" content="grasshopper, grasshopper online, grasshopper 3d" />
        <meta name="theme-color" content="#98E2C6" />
      </Head>
      <AuthLayout>
        <div className="rounded-md bg-pale p-4 flex flex-col items-center">
          <img src="/nodepen-brand.svg" width="300" className="mb-2" alt="" />
          <h1 className=" text-dark text-2xl font-semibold mt-2 mb-4">OFFLINE</h1>
          {/* <div className="buttons"> */}
          {/* <a
              href="https://discourse.mcneel.com/t/introducing-nodepen-grasshopper-on-the-web/136249"
              className="w-full p-2 flex items-center justify-center text-lg text-dark font-medium rounded-md hover:bg-green hover:text-darkgreen"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="#333"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
              Updates
            </a> */}
          <a
            href="mailto:chuck@nodepen.io"
            className="w-full p-2 flex items-center justify-center text-lg text-dark font-medium rounded-md hover:bg-green hover:text-darkgreen"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="#333"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            Support
          </a>
          {/* </div> */}
        </div>
      </AuthLayout>
      <style jsx>{`
        .buttons {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 16px;
        }
      `}</style>
    </>
  )
}

export default Home

// const Home: NextPage<HomePageProps> = ({ userExpected }) => {
//   const { token, user } = useSessionManager()

//   const showDashboard = (user && !user.isAnonymous) || userExpected

//   const content = showDashboard ? <HomePageDashboard /> : <HomePageLanding />

//   return (
//     <>
// <Head>
//   <title>NodePen</title>
//   <meta
//     name="description"
//     content="NodePen is a web client for Grasshopper, the visual programming language for Rhino 3D. Same Grasshopper, new digs. Powered by Rhino
//     Compute."
//   />
//   <meta name="keywords" content="grasshopper, grasshopper online, grasshopper 3d" />
//   <meta name="theme-color" content="#98E2C6" />
// </Head>
//       <ApolloContext token={token}>{content}</ApolloContext>
//     </>
//   )
// }

// export default Home

// export const getServerSideProps: GetServerSideProps<HomePageProps> = async (ctx) => {
//   const { token } = nookies.get(ctx, { path: '/' })

//   return {
//     props: {
//       userExpected: !!token,
//     },
//   }
// }
