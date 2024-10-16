function SearchFilter2() {
  return (
  <div id="menu-filter" className="menu menu-box-left" data-menu-height="cover" data-menu-width="cover">
  <div className="notch-clear"></div>
  <div className="menu-title ms-n1">
    <div>
    <h1>Filter Results</h1>
    <p className="color-highlight">Filter your Search Results</p>
    </div><a href="#" className="close-menu">
    <i className="fa fa-times"></i></a>
    </div>
  <p className="mb-3 mx-3 mt-n1">
      Filters can be expanded by default or collapsed. You can use any checkbox or radio style found in <a href="component-inputs.html">Component Inputs</a>. We have plenty of options to make your
      filters rich and powerful.
  </p>
  <div className="divider divider-margins"></div>
  <div className="content mt-n3 ps-1 mb-0">
      <h5 className="mb-2 font-15 font-700">Delivery Type</h5>
      <div className="row mb-2">
          <div className="col-6">
              <div className="form-check icon-check">
                  <input className="form-check-input" type="checkbox" value="" id="acheck412fg" checked/>
                  <label className="form-check-label font-14" for="acheck412fg">Pick Up</label>
                  <i className="icon-check-1 far fa-circle color-gray-dark font-16"></i>
                  <i className="icon-check-2 fa fa-check-circle font-16 color-green-dark"></i>
              </div>
              <div className="form-check icon-check">
                  <input className="form-check-input" type="checkbox" value="" id="acheck423fg"/>
                  <label className="form-check-label font-14" for="acheck423fg"> 15 Minutes</label>
                  <i className="icon-check-1 far fa-circle color-gray-dark font-16"></i>
                  <i className="icon-check-2 fa fa-check-circle font-16 color-green-dark"></i>
              </div>
              <div className="form-check icon-check">
                  <input className="form-check-input" type="checkbox" value="" id="acheck434fg"/>
                  <label className="form-check-label font-14" for="acheck434fg"> 25 Minutes</label>
                  <i className="icon-check-1 far fa-circle color-gray-dark font-16"></i>
                  <i className="icon-check-2 fa fa-check-circle font-16 color-green-dark"></i>
              </div>
          </div>
          <div className="col-6">
              <div className="form-check icon-check">
                  <input className="form-check-input" type="checkbox" value="" id="acheck435fg"/>
                  <label className="form-check-label font-14" for="acheck435fg"> 1 Hour</label>
                  <i className="icon-check-1 far fa-circle color-gray-dark font-16"></i>
                  <i className="icon-check-2 fa fa-check-circle font-16 color-green-dark"></i>
              </div>
              <div className="form-check icon-check">
                  <input className="form-check-input" type="checkbox" value="" id="acheck436fg"/>
                  <label className="form-check-label font-14" for="acheck436fg"> 2 Hours</label>
                  <i className="icon-check-1 far fa-circle color-gray-dark font-16"></i>
                  <i className="icon-check-2 fa fa-check-circle font-16 color-green-dark"></i>
              </div>
              <div className="form-check icon-check">
                  <input className="form-check-input" type="checkbox" value="" id="acheck4786fg"/>
                  <label className="form-check-label font-14" for="acheck4786fg"> 3 Hours</label>
                  <i className="icon-check-1 far fa-circle color-gray-dark font-16"></i>
                  <i className="icon-check-2 fa fa-check-circle font-16 color-green-dark"></i>
              </div>
          </div>
      </div>
      <div className="divider my-3"></div>

      {/* <!-- Price Range --> */}
      <h5 className="mb-3 font-15 mt-2">Price Range</h5>
      <div className="row mb-0">
          <div className="col-6">
              <div className="input-style has-borders no-icon mb-4 input-style-always-active">
                  <label for="form-4" className="color-highlight text-uppercase font-700 font-11">Min Price</label>
                  <select id="form-4">
                      <option value="default" disabled>From</option>
                      <option value="1a">$10</option>
                      <option value="2a">$50</option>
                      <option value="3a" selected>$100</option>
                      <option value="4a">$250</option>
                      <option value="5a">$500</option>
                  </select>
                  <span><i className="fa fa-chevron-down"></i></span>
              </div>
          </div>
          <div className="col-6">
              <div className="input-style has-borders no-icon mb-4 input-style-always-active">
                  <label for="form-4" className="color-highlight text-uppercase font-700 font-11">Max Price</label>
                  <select id="form-4">
                      <option value="default" disabled>To</option>
                      <option value="1a">$15</option>
                      <option value="2a">$25</option>
                      <option value="3a">$100</option>
                      <option value="4a" selected>$250</option>
                      <option value="5a">$500</option>
                  </select>
                  <span><i className="fa fa-chevron-down"></i></span>
              </div>
          </div>
      </div>
      {/* <!-- Property Facts --> */}
      <h5 className="mb-3 font-15">Serving Size</h5>
      <div className="row mb-0">
          <div className="col-12">
              <div className="input-style has-borders no-icon mb-4 input-style-always-active">
                  <label for="form-4b" className="color-highlight text-uppercase font-700 font-11">Min Sq Ft.</label>
                  <select id="form-4b">
                      <option value="default" disabled>From</option>
                      <option value="1a" selected>1 Person</option>
                      <option value="2a">2 Person</option>
                      <option value="3a">3 Person</option>
                      <option value="4a">5+ Person</option>
                  </select>
                  <span><i className="fa fa-chevron-down"></i></span>
              </div>
          </div>
      </div>

      <div className="divider mt-2 mb-3"></div>

      {/* <!-- Sort By --> */}
      <div className="list-group list-custom-small list-icon-0">
          <a data-bs-toggle="collapse" className="border-0" href="#collapse-filter-1">
              <span className="font-15 font-600">Sort By</span>
              <i className="fa fa-angle-down"></i>
          </a>
      </div>
      <div className="collapse" id="collapse-filter-1">
          <div className="form-check icon-check">
              <input className="form-check-input" type="checkbox" value="" id="check412" checked/>
              <label className="form-check-label font-14" for="check412">Featured</label>
              <i className="icon-check-1 far fa-circle color-gray-dark font-16"></i>
              <i className="icon-check-2 fa fa-check-circle font-16 color-green-dark"></i>
          </div>
          <div className="form-check icon-check">
              <input className="form-check-input" type="checkbox" value="" id="check423"/>
              <label className="form-check-label font-14" for="check423">Price: Low to High</label>
              <i className="icon-check-1 far fa-circle color-gray-dark font-16"></i>
              <i className="icon-check-2 fa fa-check-circle font-16 color-green-dark"></i>
          </div>
          <div className="form-check icon-check">
              <input className="form-check-input" type="checkbox" value="" id="check434"/>
              <label className="form-check-label font-14" for="check434">Price: High to Low</label>
              <i className="icon-check-1 far fa-circle color-gray-dark font-16"></i>
              <i className="icon-check-2 fa fa-check-circle font-16 color-green-dark"></i>
          </div>
          <div className="form-check icon-check">
              <input className="form-check-input" type="checkbox" value="" id="check435"/>
              <label className="form-check-label font-14" for="check435">Avg. Customer Review</label>
              <i className="icon-check-1 far fa-circle color-gray-dark font-16"></i>
              <i className="icon-check-2 fa fa-check-circle font-16 color-green-dark"></i>
          </div>
          <div className="form-check icon-check">
              <input className="form-check-input" type="checkbox" value="" id="check436"/>
              <label className="form-check-label font-14" for="check436">New Arrivals</label>
              <i className="icon-check-1 far fa-circle color-gray-dark font-16"></i>
              <i className="icon-check-2 fa fa-check-circle font-16 color-green-dark"></i>
          </div>
          <div className="mb-3"></div>
      </div>

      {/* <!-- Category --> */}
      <div className="list-group list-custom-small list-icon-0">
          <a data-bs-toggle="collapse" className="border-0" href="#collapse-filter-1a">
              <span className="font-15 font-600">Category</span>
              <i className="fa fa-angle-down"></i>
          </a>
      </div>
      <div className="collapse" id="collapse-filter-1a">
          <div className="form-check icon-check">
              <input className="form-check-input" type="checkbox" value="" id="check412a" checked/>
              <label className="form-check-label font-14" for="check412a">Fast Food</label>
              <i className="icon-check-1 far fa-circle color-gray-dark font-16"></i>
              <i className="icon-check-2 fa fa-check-circle font-16 color-green-dark"></i>
          </div>
          <div className="form-check icon-check">
              <input className="form-check-input" type="checkbox" value="" id="check434b"/>
              <label className="form-check-label font-14" for="check434b">Restaurant</label>
              <i className="icon-check-1 far fa-circle color-gray-dark font-16"></i>
              <i className="icon-check-2 fa fa-check-circle font-16 color-green-dark"></i>
          </div>
          <div className="mb-3"></div>
      </div>

      {/* <!-- Sold by--> */}
      <div className="list-group list-custom-small list-icon-0">
          <a data-bs-toggle="collapse" className="border-0" href="#collapse-filter-2">
              <span className="font-15 font-600">Delivered By</span>
              <i className="fa fa-angle-down"></i>
          </a>
      </div>
      <div className="collapse" id="collapse-filter-2">
          <div className="form-check icon-check">
              <input className="form-check-input" type="checkbox" value="" id="check412ad" checked/>
              <label className="form-check-label font-14" for="check412ad">Company Delivery</label>
              <i className="icon-check-1 far fa-circle color-gray-dark font-16"></i>
              <i className="icon-check-2 fa fa-check-circle font-16 color-green-dark"></i>
          </div>
          <div className="form-check icon-check">
              <input className="form-check-input" type="checkbox" value="" id="check434bd"/>
              <label className="form-check-label font-14" for="check434bd">Delivery Services</label>
              <i className="icon-check-1 far fa-circle color-gray-dark font-16"></i>
              <i className="icon-check-2 fa fa-check-circle font-16 color-green-dark"></i>
          </div>
          <div className="mb-3"></div>
      </div>
      <div className="list-group list-custom-small list-icon-0">
          <a data-bs-toggle="collapse" className="border-0" href="#collapse-filter-2a">
              <span className="font-15 font-600">Price</span>
              <i className="fa fa-angle-down"></i>
          </a>
      </div>
      <div className="collapse" id="collapse-filter-2a">
          <div className="form-check icon-check">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" value="" id="radio1" checked/>
              <label className="form-check-label" for="radio1">All Prices</label>
              <i className="icon-check-1 far fa-circle color-gray-dark font-16"></i>
              <i className="icon-check-2 fa fa-check-circle font-16 color-green-dark"></i>
          </div>
          <div className="form-check icon-check">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" value="" id="radio1a"/>
              <label className="form-check-label" for="radio1a">$25 + </label>
              <i className="icon-check-1 far fa-circle color-gray-dark font-16"></i>
              <i className="icon-check-2 fa fa-check-circle font-16 color-green-dark"></i>
          </div>
          <div className="form-check icon-check">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" value="" id="radio1b"/>
              <label className="form-check-label" for="radio1b">$50 +</label>
              <i className="icon-check-1 far fa-circle color-gray-dark font-16"></i>
              <i className="icon-check-2 fa fa-check-circle font-16 color-green-dark"></i>
          </div>
          <div className="form-check icon-check">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" value="" id="radio1c"/>
              <label className="form-check-label" for="radio1c">$100 +</label>
              <i className="icon-check-1 far fa-circle color-gray-dark font-16"></i>
              <i className="icon-check-2 fa fa-check-circle font-16 color-green-dark"></i>
          </div>
          <div className="form-check icon-check">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" value="" id="radio1d"/>
              <label className="form-check-label" for="radio1d">Over 100$</label>
              <i className="icon-check-1 far fa-circle color-gray-dark font-16"></i>
              <i className="icon-check-2 fa fa-check-circle font-16 color-green-dark"></i>
          </div>
          <div className="mb-3"></div>
      </div>
      {/* <!-- Rating--> */}
      <div className="list-group list-custom-small list-icon-0">
          <a data-bs-toggle="collapse" className="border-0" href="#collapse-filter-3">
              <span className="font-15 font-600">Rating</span>
              <i className="fa fa-angle-down"></i>
          </a>
      </div>
      <div className="collapse" id="collapse-filter-3">
          <div className="form-check icon-check">
              <input className="form-check-input" type="checkbox" value="" id="check412adg" checked/>
              <label className="form-check-label font-14" for="check412adg">
                  <i className="fa fa-star position-relative start-0 color-yellow-dark me-n1" style="transform:translateY(-2px);"></i>
                  <i className="fa fa-star position-relative start-0 color-yellow-dark me-n1" style="transform:translateY(-2px);"></i>
                  <i className="fa fa-star position-relative start-0 color-yellow-dark me-n1" style="transform:translateY(-2px);"></i>
                  <i className="fa fa-star position-relative start-0 color-yellow-dark me-n1" style="transform:translateY(-2px);"></i>
                  <i className="fa fa-star position-relative start-0 color-yellow-dark me-n1" style="transform:translateY(-2px);"></i>
              </label>
              <i className="icon-check-1 far fa-circle color-gray-dark font-16"></i>
              <i className="icon-check-2 fa fa-check-circle font-16 color-green-dark"></i>
          </div>
          <div className="form-check icon-check">
              <input className="form-check-input" type="checkbox" value="" id="check434bdg"/>
              <label className="form-check-label font-14" for="check434bdg">
                  <i className="fa fa-star position-relative start-0 color-yellow-dark me-n1" style="transform:translateY(-2px);"></i>
                  <i className="fa fa-star position-relative start-0 color-yellow-dark me-n1" style="transform:translateY(-2px);"></i>
                  <i className="fa fa-star position-relative start-0 color-yellow-dark me-n1" style="transform:translateY(-2px);"></i>
                  <i className="fa fa-star position-relative start-0 color-yellow-dark me-n1" style="transform:translateY(-2px);"></i>
                  <i className="fa fa-star position-relative start-0 color-gray-light me-n1" style="transform:translateY(-2px);"></i>
              </label>
              <i className="icon-check-1 far fa-circle color-gray-dark font-16"></i>
              <i className="icon-check-2 fa fa-check-circle font-16 color-green-dark"></i>
          </div>
          <div className="form-check icon-check">
              <input className="form-check-input" type="checkbox" value="" id="check435cdg"/>
              <label className="form-check-label font-14" for="check435cdg">
                  <i className="fa fa-star position-relative start-0 color-yellow-dark me-n1" style="transform:translateY(-2px);"></i>
                  <i className="fa fa-star position-relative start-0 color-yellow-dark me-n1" style="transform:translateY(-2px);"></i>
                  <i className="fa fa-star position-relative start-0 color-yellow-dark me-n1" style="transform:translateY(-2px);"></i>
                  <i className="fa fa-star position-relative start-0 color-gray-light me-n1" style="transform:translateY(-2px);"></i>
                  <i className="fa fa-star position-relative start-0 color-gray-light me-n1" style="transform:translateY(-2px);"></i>
              </label>
              <i className="icon-check-1 far fa-circle color-gray-dark font-16"></i>
              <i className="icon-check-2 fa fa-check-circle font-16 color-green-dark"></i>
          </div>
          <div className="form-check icon-check">
              <input className="form-check-input" type="checkbox" value="" id="check435cdga"/>
              <label className="form-check-label font-14" for="check435cdga">
                  <i className="fa fa-star position-relative start-0 color-yellow-dark me-n1" style="transform:translateY(-2px);"></i>
                  <i className="fa fa-star position-relative start-0 color-yellow-dark me-n1" style="transform:translateY(-2px);"></i>
                  <i className="fa fa-star position-relative start-0 color-gray-light me-n1" style="transform:translateY(-2px);"></i>
                  <i className="fa fa-star position-relative start-0 color-gray-light me-n1" style="transform:translateY(-2px);"></i>
                  <i className="fa fa-star position-relative start-0 color-gray-light me-n1" style="transform:translateY(-2px);"></i>
              </label>
              <i className="icon-check-1 far fa-circle color-gray-dark font-16"></i>
              <i className="icon-check-2 fa fa-check-circle font-16 color-green-dark"></i>
          </div>
          <div className="form-check icon-check">
              <input className="form-check-input" type="checkbox" value="" id="check435cdgb"/>
              <label className="form-check-label font-14" for="check435cdgb">
                  <i className="fa fa-star position-relative start-0 color-yellow-dark me-n1" style="transform:translateY(-2px);"></i>
                  <i className="fa fa-star position-relative start-0 color-gray-light me-n1" style="transform:translateY(-2px);"></i>
                  <i className="fa fa-star position-relative start-0 color-gray-light me-n1" style="transform:translateY(-2px);"></i>
                  <i className="fa fa-star position-relative start-0 color-gray-light me-n1" style="transform:translateY(-2px);"></i>
                  <i className="fa fa-star position-relative start-0 color-gray-light me-n1" style="transform:translateY(-2px);"></i>
              </label>
              <i className="icon-check-1 far fa-circle color-gray-dark font-16"></i>
              <i className="icon-check-2 fa fa-check-circle font-16 color-green-dark"></i>
          </div>
          <div className="mb-3"></div>
      </div>
  </div>
  <div className="divider divider-margins mt-2 mb-4"></div>
  <a href="#" className="close-menu btn btn-full mx-3 btn-m bg-highlight rounded-sm font-700 text-uppercase">Apply Filters</a>
  <div className="divider divider-margins mt-4 mb-4"></div>
  <div className="content pb-4 color-theme opacity-60 line-height-s font-12">
      Use any element you wish from the <a href="component-inputs.html">Component Inputs</a>. We have plenty of options to make your
      filters rich and powerful.
  </div>
</div>
  )
}
export default SearchFilter2