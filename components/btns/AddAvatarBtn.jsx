import Svg, { Circle, Path } from "react-native-svg";
import { View } from "react-native";

export const AddAvatarBtn = ({ isAvatar, buttonStyles }) => {
	return (
		<>
			{/* <Svg
				width="25"
				height="25"
				viewBox="0 0 25 25"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<Circle
					cx="12.5"
					cy="12.5"
					r="12"
					fill="#fff"
					stroke={isAvatar ? "#E8E8E8" : "#FF6C00"}
				/>
				{isAvatar ? (
					<Path
						d="M14.2574 13.5503L13.5503 14.2574L17.7929 18.5L13.5503 22.7426L14.2574 23.4497L18.5 19.2071L22.7426 23.4497L23.4498 22.7426L19.2071 18.5L23.4498 14.2574L22.7426 13.5503L18.5 17.7929L14.2574 13.5503Z"
						fill="#BDBDBD"
					/>
				) : (
					<Path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M13 6H12V12H6V13H12V19H13V13H19V12H13V6Z"
						fill="#FF6C00"
					/>
				)}
			</Svg> */}
			<View style={buttonStyles}>
				{isAvatar ? (
					<Svg
						width="37"
						height="37"
						viewBox="0 0 37 37"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<Circle
							cx="18.4999"
							cy="18.5"
							r="12"
							transform="rotate(-45 18.4999 18.5)"
							fill="white"
							stroke="#E8E8E8"
						/>
						<Path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M14.2574 13.5503L13.5503 14.2574L17.7929 18.5L13.5503 22.7426L14.2574 23.4497L18.5 19.2071L22.7426 23.4497L23.4498 22.7426L19.2071 18.5L23.4498 14.2574L22.7426 13.5503L18.5 17.7929L14.2574 13.5503Z"
							fill="#BDBDBD"
						/>
					</Svg>
				) : (
					<Svg
						width="25"
						height="25"
						viewBox="0 0 25 25"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<Circle cx="12.5" cy="12.5" r="12" fill="#fff" stroke="#FF6C00" />
						<Path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M13 6H12V12H6V13H12V19H13V13H19V12H13V6Z"
							fill="#FF6C00"
						/>
					</Svg>
				)}
			</View>
		</>
	);
};
