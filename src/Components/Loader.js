import { Icon } from '@iconify/react-with-api'

const Loader = () => {
    return (
        <div className = "loader" >
			<Icon icon = "eos-icons:bubble-loading" className = "loader-icon"/>
            <h1>Fetching data</h1>
		</div>
    )
}

export default Loader