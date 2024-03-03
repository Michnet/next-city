function ListingStore({listingId, ids}) {
  return (
				<div class="card card-style mx-0 shadow-0">
					<div class="content">
						<div class="row mb-0">
							<div class="col-6">
								<div class="card card-style m-0 bg-30" data-card-height="140">
									<div class="card-top p-2">
										<span class="bg-green-dark p-2 py-1 rounded-sm font-13 font-600">-50%</span>
									</div>
									<div class="card-bottom text-center pb-3">
										<a href="#" data-toast="snackbar-favorites" class="icon icon-xxs bg-theme rounded-l shadow-xl rounded-m mx-2 color-theme"><i class="fa fa-heart color-red-dark font-12"></i></a>
										<a href="#" data-toast="snackbar-cart" class="icon icon-xxs bg-theme rounded-l shadow-xl rounded-m mx-2 color-theme"><i class="fa fa-shopping-bag font-12"></i></a>
									</div>
								</div>
								<h5 class="font-600 font-16 line-height-sm pt-3">Apple Watch, Ceramic Edition, White Leather Band</h5>
								<span class="color-blue-dark d-block font-11 font-600">Featured this Week</span>
								<h2 class="pb-3 mt-n1">$2999.<sup class="font-14 font-400 opacity-50">99</sup></h2>
							</div>
							<div class="col-6">
								<div class="card card-style m-0 bg-28" data-card-height="140">
									<div class="card-top p-2">
										<span class="bg-red-dark p-2 py-1 rounded-sm font-13 font-600">-50%</span>
									</div>
									<div class="card-bottom text-center pb-3">
										<a href="#" data-toast="snackbar-favorites" class="icon icon-xxs bg-theme rounded-l shadow-xl rounded-m mx-2 color-theme"><i class="fa fa-heart color-red-dark font-12"></i></a>
										<a href="#" data-toast="snackbar-cart" class="icon icon-xxs bg-theme rounded-l shadow-xl rounded-m mx-2 color-theme"><i class="fa fa-shopping-bag font-12"></i></a>
									</div>
								</div>
								<h5 class="font-600 font-16 line-height-sm pt-3">Macbook Air, 256GB SSD, 16GB DDR4, Apple Chip M5X</h5>
								<span class="color-red-dark d-block font-11 font-600">Out of Stock</span>
								<h2 class="pb-3 mt-n1">$1999.<sup class="font-14 font-400 opacity-50">99</sup></h2>
							</div>
							<div class="col-12"><div class="divider mt-2 mb-4"></div></div>
							<div class="col-6">
								<div class="card card-style m-0 bg-21" data-card-height="140">
									<div class="card-bottom text-center pb-3">
										<a href="#" data-toast="snackbar-favorites" class="icon icon-xxs bg-theme rounded-l shadow-xl rounded-m mx-2 color-theme"><i class="fa fa-heart color-red-dark font-12"></i></a>
										<a href="#" data-toast="snackbar-cart" class="icon icon-xxs bg-theme rounded-l shadow-xl rounded-m mx-2 color-theme"><i class="fa fa-shopping-bag font-12"></i></a>
									</div>
								</div>
								<h5 class="font-600 font-16 line-height-sm pt-3">Macbook Pro, 2TB SSD, 64GB DDR4, Apple Chip M9X</h5>
								<span class="color-green-dark d-block font-11 font-600">In Stock</span>
								<h2 class="mt-n1">$2499.<sup class="font-14 font-400 opacity-50">99</sup></h2>
							</div>
							<div class="col-6">
								<div class="card card-style m-0 bg-8" data-card-height="140">
									<div class="card-bottom text-center pb-3">
										<a href="#" data-toast="snackbar-favorites" class="icon icon-xxs bg-theme rounded-l shadow-xl rounded-m mx-2 color-theme"><i class="fa fa-heart color-red-dark font-12"></i></a>
									</div>
								</div>
								<h5 class="opacity-40 font-600 font-16 line-height-sm pt-3">Macbook Air, 1TB Fushion Drive, 16GB DDR4, M9X</h5>
								<span class="color-red-dark d-block font-11 font-600">Out of Stock</span>
								<h2 class="opacity-40 pb-2 mt-n1">$999.<sup class="font-14 font-400 opacity-50">99</sup></h2>
							</div>
						</div>
					</div>
				</div>
  )
}
export default ListingStore