function ModelItem(model) {
    // const m = JSON.parse(model)
    const item = model.model
    return (
        <div id={item.id}>
            <div>
                {item.path}
            </div>
            <div>
                {item['created']}
            </div>
        </div>
    )
}

export default ModelItem