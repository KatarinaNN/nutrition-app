export const Nutrition = ({label, quantity, unit}) => {
    return(
        <div>
            <p><span className="label">{label}</span>  - <span>{quantity.toFixed(1)} {unit}</span></p>
        </div>
    )
}
