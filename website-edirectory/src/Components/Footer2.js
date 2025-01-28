import React from 'react'

function Footer2() {
  return (
    <footer id="footer" class="inverted">
            <div class="footer-content">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-2 col-lg-2 col-md-3">
                            
                            <div class="widget">
                                <h4>PROJECT</h4>
                                <ul class="list">
                                    <li><a href="#">Latest Release</a></li>
                                    <li><a href="#">Updates</a></li>
                                    <li><a href="#">License</a></li>
                                    <li><a href="#">News</a></li>
                                    <li><a href="#">Links</a></li>
                                </ul>
                            </div>
                           
                        </div>
                        <div class="col-xl-2 col-lg-2 col-md-3">
                            
                            <div class="widget">
                                <h4>SUPPORT</h4>
                                <ul class="list">
                                    <li><a href="#">Troubleshooting</a></li>
                                    <li><a href="#">Common Questions</a></li>
                                    <li><a href="#">Report a Bug</a></li>
                                    <li><a href="#">Get Help</a></li>
                                    <li><a href="#">FAQS</a></li>
                                </ul>
                            </div>
                            
                        </div>

                        <div class="col-xl-2 col-lg-2 col-md-3">
                           
                            <div class="widget">
                                <h4>COMPANY</h4>
                                <ul class="list">
                                    <li><a href="#">About</a></li>
                                    <li><a href="#">Contact</a></li>
                                    <li><a href="#">Home</a></li>
                                    <li><a href="#">Blog</a></li>
                                    <li><a href="#">Portfolio</a></li>
                                </ul>
                            </div>
                           
                        </div>

                        <div class="col-xl-2 col-lg-2 col-md-3">
                           
                            <div class="widget">
                                <h4>INFO</h4>
                                <ul class="list">
                                    <li><a href="#">Get Directions</a></li>
                                    <li><a href="#">Call Us</a></li>
                                    <li><a href="#">Our Staff</a></li>
                                    <li><a href="#">Working Hours</a></li>
                                    <li><a href="#">Offices</a></li>
                                </ul>
                            </div>
                            
                        </div>

                        <div class="col-xl-4 col-lg-4 col-md-12">
                            
                            <div class="widget clearfix widget-newsletter">
                                <h4 class="widget-title"><i class="fa fa-envelope"></i> Sign Up For a Newsletter</h4>
                                <p>Weekly breaking news, analysis and cutting edge advices on job searching.

                                </p>
                                <form class="widget-subscribe-form p-r-40" action="include/subscribe-form.php" role="form" method="post" novalidate="novalidate">


                                    <div class="input-group">
                                        <input aria-required="true" name="widget-subscribe-form-email" class="form-control required email" placeholder="Enter your Email" type="email"/>
                                        <span class="input-group-btn">
                      <button type="submit" id="widget-subscribe-submit-button" class="btn btn-primary"><i class="fa fa-paper-plane"></i></button>
                    </span> </div>
                                </form>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
            <div class="copyright-content">
                <div class="container">

                    <div class="row">
                        <div class="col-lg-6">
                           
                            <div class="social-icons social-icons">
                                <ul>
                                    <li class="social-rss"><a href="#"><i class="fa fa-rss"></i></a></li>
                                    <li class="social-facebook"><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                    <li class="social-twitter"><a href="#"><i class="fab fa-twitter"></i></a></li>
                                    <li class="social-vimeo"><a href="#"><i class="fab fa-vimeo"></i></a></li>
                                    <li class="social-youtube"><a href="#"><i class="fab fa-youtube"></i></a></li>
                                    <li class="social-pinterest"><a href="#"><i class="fab fa-pinterest"></i></a></li>
                                    <li class="social-gplus"><a href="#"><i class="fab fa-google-plus-g"></i></a></li>
                                </ul>
                            </div>
                            
                        </div>

                        <div class="col-lg-6 text-end">
                            <div class="copyright-text">© 2024 E-Directory website. All Rights Reserved. </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
  )
}

export default Footer2