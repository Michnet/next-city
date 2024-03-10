import Link from "next/link"
import { UserCard } from "../UI/UserCard"

function MainMenu({children}) {
  return (
  <div id="sidebar_menu" className="list-group border-0 rounded-0 text-sm-start h-100">
                        <div id="menu-sidebar" className="bg-white" /* data-menu-width="320" data-menu-effect="menu-push" */>
                            <div className="sidebar-content">
                               <UserCard/>
                                <div className="card card-style shadow-0 border">
                                    <div className="content my-0">
                                        <h5 className="font-700 text-uppercase opacity-40 font-12 pt-2 mb-0">Navigation</h5>
                                        <div className="list-group list-custom-small list-icon-0">
                                            <Link href="/">
                                                <i className="fa font-12 fa-home gradient-green rounded-sm color-white"></i>
                                                <span>Homepage</span>
                                                <i className="fa fa-angle-right"></i>
                                            </Link>
                                            <Link href="/explore/events">
                                                <i className="fa font-12 fa-calendar-check gradient-red rounded-sm color-white"></i>
                                                <span>Explore</span>
                                                <span className="badge bg-highlight">NEW</span>
                                                <i className="fa fa-angle-right"></i>
                                            </Link>
                                            <a href="#">
                                                <i className="fa font-12 fa-file gradient-blue rounded-sm color-white"></i>
                                                <span>Page Packs</span>
                                                <i className="fa fa-angle-right"></i>
                                            </a>
                                            <a href="#">
                                                <i className="fa font-12 fa-camera gradient-yellow rounded-sm color-white"></i>
                                                <span>Media</span>
                                                <i className="fa fa-angle-right"></i>
                                            </a>
                                            <a href="#">
                                                <i className="fa font-12 fa-image gradient-teal rounded-sm color-white"></i>
                                                <span>Contact</span>
                                                <i className="fa fa-angle-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="card card-style shadow-0 border">
                                    <div className="content my-0">
                                        <h5 className="font-700 text-uppercase opacity-40 font-12 pt-2 mb-0">Contacts</h5>
                                        <div className="list-group list-custom-small list-icon-0">
                                            <a href="#">
                                                <img src="/images/avatars/5s.png" className="gradient-blue rounded-sm" width="27"/>
                                                <span>Steve Johnson</span>
                                                <span className="badge bg-highlight badge-small rounded-xl me-n1">2</span>
                                                <i className="fa fa-angle-right"></i>
                                            </a>
                                            <a href="#">
                                                <img src="/images/avatars/1s.png" className="gradient-magenta rounded-sm" width="27"/>
                                                <span>Anna Smith</span>
                                                <span className="badge bg-highlight badge-small rounded-xl me-n1">15</span>
                                                <i className="fa fa-angle-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="card card-style shadow-0 border">
                                    <div className="content my-0">
                                        <h5 className="font-700 text-uppercase opacity-40 font-12 pt-2 mb-0">Settings</h5>
                                        <div className="list-group list-custom-small list-icon-0">
                                            <a href="#" data-menu="menu-highlights">
                                                <i className="fa font-12 fa-droplet gradient-blue rounded-sm color-white"></i>
                                                <span>Highlights</span>
                                                <i className="fa fa-angle-right"></i>
                                            </a>
                                            <a href="#" data-menu="menu-backgrounds">
                                                <i className="fa font-12 fa-paint-brush gradient-orange rounded-sm color-white"></i>
                                                <span>Backgrounds</span>
                                                <i className="fa fa-angle-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="position-sticky w-100 bottom-0 end-0 pb-1">
                                <div className="card card-style mb-3">
                                    <div className="content my-0 py-">
                                        <div className="list-group list-custom-small list-icon-0">
                                            <a href="#" data-toggle-theme data-trigger-switch="switch-dark2-mode" className="border-0">
                                                <i className="fa font-12 fa-moon gradient-yellow color-white rounded-sm"></i>
                                                <span>Dark Mode</span>
                                                <div className="custom-control ios-switch">
                                                    <input data-toggle-theme type="checkbox" className="ios-input" id="switch-dark2-mode"/>
                                                    <label className="custom-control-label" htmlFor="switch-dark2-mode"></label>
                                                </div>
                                                <i className="fa fa-angle-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
  )
}
export default MainMenu