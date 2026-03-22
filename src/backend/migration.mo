import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type OldProduct = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    unit : Text;
    category : Text;
    imageUrl : Text;
    isAvailable : Bool;
  };

  type OldActor = {
    products : Map.Map<Nat, OldProduct>;
    contactSubmissions : Map.Map<Nat, ContactSubmission>;
    var nextProductId : Nat;
    var nextContactId : Nat;
  };

  type ContactSubmission = {
    name : Text;
    phone : Text;
    message : Text;
  };

  type NewProduct = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    unit : Text;
    category : Text;
    imageUrl : Text;
    quantity : Nat;
    isAvailable : Bool;
  };

  type NewActor = {
    products : Map.Map<Nat, NewProduct>;
    contactSubmissions : Map.Map<Nat, ContactSubmission>;
    var nextProductId : Nat;
    var nextContactId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    let newProducts = old.products.map<Nat, OldProduct, NewProduct>(
      func(_id, oldProduct) {
        {
          id = oldProduct.id;
          name = oldProduct.name;
          description = oldProduct.description;
          price = oldProduct.price;
          unit = oldProduct.unit;
          category = oldProduct.category;
          imageUrl = oldProduct.imageUrl;
          quantity = 0;
          isAvailable = oldProduct.isAvailable;
        };
      }
    );
    {
      products = newProducts;
      contactSubmissions = old.contactSubmissions;
      var nextProductId = old.nextProductId;
      var nextContactId = old.nextContactId;
    };
  };
};
