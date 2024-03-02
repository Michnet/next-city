import listingMenu from "./ListingMenu";

function RightMenu({listing}) {
    let localMenu = listingMenu({listing:listing, userId: user?.id});
  return (
    <>
    <div id="menu-sidebar-right-2" class="menu menu-box-right menu-box-detached menu-sidebar" data-menu-width="310">
		<div class="sidebar-content">
			<div class="card card-style bg-9 my-3" data-card-height="130">
				<div class="card-bottom m-3">
					<h1 class="mb-n1 color-white">Meet Sticky</h1>
					<p class="color-white mb-0 opacity-50">Now with Sidebars too!</p>
				</div>
				<div class="card-top m-2">
					<a href="#" class="icon icon-xxs gradient-red rounded-sm float-end close-menu"><i class="fa fa-times color-white"></i></a>
				</div>
				<div class="card-overlay bg-gradient"></div>
				<div class="card-overlay bg-black opacity-10"></div>
			</div>
			<div class="card card-style">
				<div class="content my-0">
					<h5 class="font-700 text-uppercase opacity-40 font-12 pt-2 mb-0">Navigation</h5>
					<div class="list-group list-custom-small list-icon-0">
						<a href="#">
							<i class="fa font-12 fa-home gradient-green rounded-sm color-white"></i>
							<span>Homepage</span>
							<i class="fa fa-angle-right"></i>
						</a>
						<a href="#">
							<i class="fa font-12 fa-cog gradient-red rounded-sm color-white"></i>
							<span>Components</span>
							<span class="badge bg-highlight">NEW</span>
							<i class="fa fa-angle-right"></i>
						</a>
						<a href="#">
							<i class="fa font-12 fa-file gradient-blue rounded-sm color-white"></i>
							<span>Page Packs</span>
							<i class="fa fa-angle-right"></i>
						</a>
						<a href="#">
							<i class="fa font-12 fa-camera gradient-yellow rounded-sm color-white"></i>
							<span>Media</span>
							<i class="fa fa-angle-right"></i>
						</a>
						<a href="#">
							<i class="fa font-12 fa-image gradient-teal rounded-sm color-white"></i>
							<span>Contact</span>
							<i class="fa fa-angle-right"></i>
						</a>
					</div>
				</div>
			</div>

			<div class="card card-style">
				<div class="content my-0">
					<h5 class="font-700 text-uppercase opacity-40 font-12 pt-2 mb-0">Settings</h5>
					<div class="list-group list-custom-small list-icon-0">
						<a href="#" data-toggle-theme data-trigger-switch="switch-dark2-mode" class="border-0">
							<i class="fa font-12 fa-moon gradient-mint color-white rounded-sm"></i>
							<span>Dark Mode</span>
							<div class="custom-control ios-switch">
								<input data-toggle-theme type="checkbox" class="ios-input" id="switch-dark2-mode"/>
								<label class="custom-control-label" for="switch-dark2-mode"></label>
							</div>
							<i class="fa fa-angle-right"></i>
						</a>
						<a href="#" data-menu="menu-highlights">
							<i class="fa font-12 fa-droplet gradient-blue rounded-sm color-white"></i>
							<span>Highlights</span>
							<i class="fa fa-angle-right"></i>
						</a>
						<a href="#" data-menu="menu-backgrounds">
							<i class="fa font-12 fa-paint-brush gradient-orange rounded-sm color-white"></i>
							<span>Backgrounds</span>
							<i class="fa fa-angle-right"></i>
						</a>
					</div>
				</div>
			</div>
		</div>
		<div class="position-sticky w-100 bottom-0 end-0 pb-1">
			<div class="bg-theme mx-3 rounded-m shadow-m">
				<div class="d-flex px-2 pb-2 pt-2">
					<div class="align-self-center">
						<a href="#"><img src="images/pictures/7s.jpg" width="40" class="rounded-sm" alt="img"/></a>
					</div>
					<div class="ps-2 align-self-center">
						<h5 class="ps-1 mb-1 pt-1 line-height-xs font-17">Alex Doeson</h5>
						<h6 class="ps-1 mb-0 font-400 opacity-40 font-12">Freelance Photographer</h6>
					</div>
					<div class="ms-auto">
						<a href="#" data-bs-toggle="dropdown" class="icon icon-m ps-3"><i class="fa fa-ellipsis-v font-18 color-theme"></i></a>
						<div class="dropdown-menu bg-transparent border-0 mb-n5">
							<div class="card card-style rounded-m shadow-xl me-1">
								<div class="list-group list-custom-small list-icon-0 px-3 mt-n1">
									<a href="#" class="mb-n2 mt-n1">
										<span>Your Profile</span>
										<i class="fa fa-angle-right"></i>
									</a>
									<a href="#" class="mb-n2">
										<span>Messages</span>
										<i class="fa fa-angle-right"></i>
									</a>
									<a href="#" class="mb-n2">
										<span>Settings</span>
										<i class="fa fa-angle-right"></i>
									</a>
									<a href="#" class="mb-n1">
										<span>Sign Out</span>
										<i class="fa fa-angle-right"></i>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    </>
  )
}
export default RightMenu