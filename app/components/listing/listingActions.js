"use client";

import VisitorActions from "@/components/listing/partials/VisitorActions";
import { closeMenus, openOffCanvas } from "@/helpers/appjs"
import { cleanHtml } from "@/helpers/universal"
import CallToActions from "@/components/UI/CallToActions";
import Link from "next/link";


function ListingActions({listing}) {
    let VisitorActionsView;

    if(listing){
        VisitorActionsView = <div>
            <VisitorActions /* setActiveKey={setActiveView} */ listing={listing} extraItem = {<div className="action_box" data-menu='activeViewModal' onClick={(e) => openOffCanvas(e)}> <i className="las la-bullseye"/> <label>View Mode</label> </div>}/>
            <hr/>
            <CallToActions centered thin light bgClass={'bg-transparent'} actionComponent={
                <div className="d-flex  gap-3 flex-center">
                    <Link href={'/add-listing'}><button
                className="btn btn-theme rounded-22 w-auto px-10 h-full text-14 fw-500"
                >
                Create listing page
                </button></Link>
                <Link href={'/about/about-us'}><button
                className="btn btn-outline-theme rounded-22 w-auto px-10 h-full text-14 fw-500"
                >
                Learn More
                </button></Link>
                </div>
                }
                descript = {"You can also create your own event page today. It's FREE"}
                />
            </div>
    }
  return (
    <div id="listingActions" className="menu menu-box-bottom menu-box-detached">
                    <div className="menu-title smLine mt-0">
                        <div><h1 className="truncate-2 p-0 px-3">{cleanHtml(listing?.title.rendered)}</h1>
                        <p className="color-highlight">Options ...</p></div>
                        <span className="close-menu" onClick={() => closeMenus()}>
                            <i className="fa fa-times"></i>
                        </span>
                        </div>
                        <div className="divider divider-margins mb-n2"></div>
                    <div className="content">
                        {VisitorActionsView}
                    </div>
                </div>
  )
}
export default ListingActions