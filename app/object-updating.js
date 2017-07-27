export class ObjectUpdater {
   constructor(objectToUpdate) {
      this.objectToUpdate = objectToUpdate;
   }

   update(objectToUpdateWith) {
      return this._update(this.objectToUpdate, objectToUpdateWith);
   }

   _update(objectToUpdate, objectToUpdateWith) {
      const changes = {};

      Object.keys(objectToUpdateWith).forEach((key) => {
         if (
           objectToUpdate.hasOwnProperty(key)
           && objectToUpdateWith[key].constructor === Object
           && objectToUpdate[key].constructor === Object
         ) {
            let childUpdates = this._update(objectToUpdate[key], objectToUpdateWith[key]);

            if (Object.keys(childUpdates).length !== 0) changes[key] = childUpdates;
         } else if (
           !objectToUpdate.hasOwnProperty(key)
           || objectToUpdate.hasOwnProperty(key) && objectToUpdate[key] !== objectToUpdateWith[key]
         ) {
            objectToUpdate[key] = changes[key] = objectToUpdateWith[key];
         }
      });

      return changes;
   }
}