interface IOptions {
    className?: string
    scrollSpeed?: number
    timeoutBeforeInit?: number
}

const ACTIVATED_ATTRIBUTE = "text-truncate-scroll-activated"

/**
 * Setup text truncate scroll with the given options.
 * It WILL modify the structure of the element
 * @param options Any options
 */
export const activateTextTruncateScroll = (options?: IOptions) => {
    const className = options?.className || "text-truncate-scroll"

    const elements = document.getElementsByClassName(className) as HTMLCollectionOf<HTMLElement>

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i]
        if (!element.hasAttribute(ACTIVATED_ATTRIBUTE) && element.parentElement) {
            configureOneElement(element, options)
        }
    }
}

/**
 * Setup the truncate stuff for the given DOM element
 * @param element The DOM element to setup
 * @param options Any options
 */
const configureOneElement = (element: HTMLElement, options?: IOptions) => {
    const scrollSpeed = options?.scrollSpeed || 60
    const timeoutBeforeInit = options?.timeoutBeforeInit || 800
    const parentElement = element.parentElement

    // Convert into nested structure for this package to work:
    // E.g. <p>xxxxxx</p> into <p><span><span>xxxxxx</span></span></p>
    const span1 = document.createElement("span")
    const span2 = document.createElement("span")
    span2.textContent = element.textContent

    // Give the 2 spans a class names that we can refer to later
    const span1ClassName = `text-truncate-scroll-span-1-${crypto.randomUUID()}`
    const span2ClassName = `text-truncate-scroll-span-2-${crypto.randomUUID()}`
    span1.classList.add(span1ClassName)
    span2.classList.add(span2ClassName)

    // Remove everything from original element
    // And then append out spans into original element
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }

    span1.appendChild(span2)
    element.appendChild(span1)

    // Apply specific styles to the all elements to make the package work
    const styles = document.createElement("style")
    styles.textContent = generateStyles({ span1ClassName, span2ClassName })
    parentElement?.insertBefore(styles, parentElement.firstChild)

    // This function calculates the width and apply styles to make the package work
    const calculate = () => {
        // This is make it overflow so we can get self width properly
        span2.style.width = "auto"

        const span2Width = span2.clientWidth || 0
        const span1Width = span2.parentElement?.clientWidth || 0

        // Custom styles to make the hover effect work
        const transformStyles = span2Width > span1Width ? `translateX(calc(-100% + ${span1Width}px - 5px))` : ""
        const transitionStyles = `all ${(span2Width - span1Width) / scrollSpeed}s linear`
        styles.textContent = generateStyles({ span1ClassName, span2ClassName, transformStyles, transitionStyles })

        // Then reset back to original
        span2.style.width = ""
    }

    // Register a resize observer on it so that we can re-calculate it
    const resizeObserver = new ResizeObserver(calculate)
    resizeObserver.observe(element)

    // Run initial calculate, after a short timeout waiting for parent container to
    // fully mount etc. Some parents taken time to adjust its dimension
    setTimeout(calculate, timeoutBeforeInit)
}

const generateStyles = ({
    span1ClassName,
    span2ClassName,
    transformStyles,
    transitionStyles,
}: {
    span1ClassName: string
    span2ClassName: string
    transformStyles?: string
    transitionStyles?: string
}) => `
p {
    display: grid;
}

span {
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
}

/* Inner span 1 */
.${span1ClassName} {
    display: inline-block;
    width: 100%;
    vertical-align: middle;
    overflow: hidden;
}

p:hover .${span1ClassName},
p:focus .${span1ClassName},
p:active .${span1ClassName} {
    width: auto;
}

/* Inner span 2 */
.${span2ClassName} {
    position: relative;
    display: inline-block;
    left: 0px;
    width: 100%;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

p:hover .${span2ClassName},
p:focus .${span2ClassName},
p:active .${span2ClassName} {
    width: auto;
    transform: ${transformStyles || ""};
    transition: ${transitionStyles || ""};
}
`
