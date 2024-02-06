import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro, faStar, faPlane, faUsers, faThumbsUp, faBox } from '@fortawesome/free-solid-svg-icons';


function FeatureSection() {
  return (
    <section className="mt-5 bg-gray-100">
      <div className="container text-dark pt-3">
        <header className="pt-4 pb-3">
          <h3>Why choose us</h3>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center">
            <span className="rounded-full bg-white p-3 flex-shrink-0 mr-2 mb-2">
              <i className="fas fa-camera-retro fa-2x fa-fw text-primary"></i>
            </span>
            <div className="info">
              <h6 className="title">Reasonable prices</h6>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmor</p>
            </div>
          </div>

          <div className="flex items-center">
            <span className="rounded-full bg-white p-3 flex-shrink-0 mr-2 mb-2">
              <i className="fas fa-star fa-2x fa-fw text-primary"></i>
            </span>
            <div className="info">
              <h6 className="title">Best quality</h6>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmor</p>
            </div>
          </div>

          <div className="flex items-center">
            <span className="rounded-full bg-white p-3 flex-shrink-0 mr-2 mb-2">
              <i className="fas fa-plane fa-2x fa-fw text-primary"></i>
            </span>
            <div className="info">
              <h6 className="title">Worldwide shipping</h6>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmor</p>
            </div>
          </div>

          {/* Add more items as needed */}
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
