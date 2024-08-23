import React from 'react';
import { Link } from 'react-router-dom';
import { GoGoal } from 'react-icons/go';
import { IconContext } from 'react-icons';

const Footer = () => {
	return (
		<footer>
			<div
				style={{
					width: '100%',
					minHeight: '20vh',
					maxHeight: '30vh',
					marginTop: 60,
				}}>
				<p style={{ fontSize: '30px', textAlign: 'center', padding: '20px' }}>
					Built with passion by
					<span>
						<Link
							style={{ color: 'white' }}
							className='nav-link'
							to={'https://www.linkedin.com/in/milan-pavasiya/'}>
							Milan Pavasiya
						</Link>
					</span>
					<IconContext.Provider
						value={{ color: 'red', className: 'global-class-name' }}>
						<GoGoal />
					</IconContext.Provider>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
