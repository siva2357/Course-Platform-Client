import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent {

  constructor(public router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  showMenu = false;
activeCategory: any = null;
hideTimeout: any = null;

onMenuEnter() {
  clearTimeout(this.hideTimeout);
  this.showMenu = true;

}

onMenuLeave() {
  this.hideTimeout = setTimeout(() => {
    this.showMenu = false;

    this.activeCategory = null;
  }, 200); // delay to allow re-entry
}



  mainCategories = [
    {
      name: 'Graphic Design',
      subcategories: ['Adobe Photoshop', 'Adobe Illustrator', 'Figma', 'Sketch', 'InDesign', 'Canva','Pro create', 'Digital painting']
    },
    {
      name: 'User Experience Design',
      subcategories: ['Figma', 'Adobe XD', 'Sketch',  'Web design', 'Product design', 'Design thinking']
    },
    {
      name: 'Game Development',
      subcategories: ['Unity', 'Unreal Engine', 'Godot Engine', 'GameMaker Studio 2', 'Construct 3', 'RPG Maker', 'c++ Programming language ', 'Audacity (sound editing)','Maya (For 3D Animation)', '2D Game development']
    },
    {
      name: '3D Animation',
      subcategories: [ 'Autodesk Maya', 'Blender', 'Cinema 4D','3ds Max','Houdini','ZBrush','Marvelous Designer', 'Substance Painter']
    },
    {
      name: 'Architectural Design',
      subcategories: ['AutoCAD', 'Autodesk Revit','SketchUp', 'Rhino 3D','ArchiCAD','Grasshopper','Autodesk 3ds Max','Lumion (for rendering)','Twinmotion','V-Ray','Enscape']
    },
    {
      name: 'VFX & SFX',
      subcategories: [ 'Adobe After Effects', 'Nuke (Foundry)','Houdini','Mocha Pro','DaVinci Resolve Fusion','PFTrack (3D camera tracking)', 'Autodesk Flame', 'Blender (for VFX compositing)']
    }
  ];





goToCartPage(){
  this.router.navigate(['/cart']);

}

}
