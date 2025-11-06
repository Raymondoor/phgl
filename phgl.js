class Phgl {
    /*
    Make a div element with the class "phgl" and attribute of "phgl-image" with the image URL as value.
        <div class="phgl" phgl-image="https://upload.wikimedia.org/wikipedia/commons/5/50/California_Arena_Point_fern.jpg"></div>
    You can set any other attributes, styles as you want.
    */
    constructor() {
        this.elements = document.querySelectorAll('.phgl[phgl-image]');
        this.expanded = false;
        this.init();
    }

    init() {
        // Set background images and bind click events
        this.elements.forEach((element) => {
            const imageUrl = element.getAttribute('phgl-image');
            element.style.backgroundImage = `url(${imageUrl})`;
            element.style.backgroundPosition = "center";
            element.style.backgroundRepeat = "no-repeat";
            element.style.backgroundSize = "cover";
            element.style.minWidth = '160px';
            element.style.minHeight = '160px';
            element.style.cursor = 'pointer';
            element.style.transition = 'all 360ms'; // Transition for fade
            element.addEventListener('click', () => this.expand(element));
            element.addEventListener('keydown', (e) => {
                if((e.key === 'Enter' || e.key === ' ') && !this.expanded){
                    this.expand(element);
                };
            });
        });
    }

    expand(element) {
        if(this.expanded) return;
        this.expanded = true;
        // Get image URL from phgl-image attribute
        const imageUrl = element.getAttribute('phgl-image');

        // Create overlay
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100dvh';
        overlay.style.background = 'rgba(0,0,0,0.8)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '1000';
        overlay.style.opacity = '0'; // Start with invisible overlay
        overlay.style.transition = 'opacity 360ms'; // Transition for fade

        // Create expanded image
        const expandedImage = document.createElement('img');
        expandedImage.src = imageUrl;
        expandedImage.style.maxWidth = '90%';
        expandedImage.style.maxHeight = '90%';
        expandedImage.style.objectFit = 'contain';
        expandedImage.style.opacity = '0'; // Start with invisible image
        expandedImage.style.transition = 'opacity 360ms'; // Transition for fade

        overlay.appendChild(expandedImage);
        document.body.appendChild(overlay);

        // Trigger fade-in animation after appending
        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
            expandedImage.style.opacity = '1';
        });
        // Remove procedure
        const removeImg = () =>{
            // Start fade-out animation
            overlay.style.opacity = '0';
            expandedImage.style.opacity = '0';
            console.log(this.expanded);
            // Remove overlay after animation completes
            setTimeout(() => {
                overlay.remove();
                this.expanded = false;
            }, 360); // Match the transition duration (360ms)
        };

        // Close on overlay click
        overlay.addEventListener('click', ()=>removeImg());
        document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape')removeImg();
        });

        // Prevent closing when clicking the image
        expandedImage.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}