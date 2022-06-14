import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'

const router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<div>404</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />}>
            {/* <Route index element={<Home />} />
            <Route path="teams" element={<Teams />}>
              <Route path=":teamId" element={<Team />} />
              <Route path="new" element={<NewTeamForm />} />
              <Route index element={<LeagueStandings />} />
            </Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default router