import { Icon } from '@iconify/react-with-api'

const LocationMarker = ({ lat, lng, onClick }) => {
    return (
        <div className = "location-marker" onClick={ onClick }>
			<Icon icon = "icon-park-outline:parking" className = "location-icon"/>
		</div>
    )
}

export default LocationMarker