import Text "mo:core/Text";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Nat "mo:core/Nat";



actor {
  type Product = {
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

  type ContactSubmission = {
    name : Text;
    phone : Text;
    message : Text;
  };

  let products = Map.fromIter<Nat, Product>([(1, {
    id = 1;
    name = "Fresh Buffalo Milk";
    description = "Pure fresh buffalo milk. Daily supply.";
    price = 30;
    unit = "500ml";
    category = "Milk";
    imageUrl = "https://nanaji-dairy.com/images/milk.jpg";
    quantity = 100;
    isAvailable = true;
  })].values());

  products.add(
    2,
    {
      id = 2;
      name = "Desi Ghee";
      description = "High-quality ghee made from buffalo milk.";
      price = 450;
      unit = "500g";
      category = "Ghee";
      imageUrl = "https://nanaji-dairy.com/images/ghee.jpg";
      quantity = 50;
      isAvailable = true;
    },
  );

  products.add(
    3,
    {
      id = 3;
      name = "Paneer";
      description = "Soft, fresh paneer. Great for cooking.";
      price = 80;
      unit = "200g";
      category = "Paneer";
      imageUrl = "https://nanaji-dairy.com/images/paneer.jpg";
      quantity = 30;
      isAvailable = true;
    },
  );

  products.add(
    4,
    {
      id = 4;
      name = "Milk Barfi";
      description = "Classic Indian sweet made from milk.";
      price = 120;
      unit = "250g";
      category = "Sweets";
      imageUrl = "https://nanaji-dairy.com/images/barfi.jpg";
      quantity = 80;
      isAvailable = true;
    },
  );

  let contactSubmissions = Map.empty<Nat, ContactSubmission>();
  var nextProductId = 5;
  var nextContactId = 1;

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    products.values().filter(
      func(p) { Text.equal(p.category, category) }
    ).toArray();
  };

  public query ({ caller }) func getProductById(id : Nat) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public shared ({ caller }) func submitContactForm(name : Text, phone : Text, message : Text) : async () {
    let submission : ContactSubmission = {
      name;
      phone;
      message;
    };
    contactSubmissions.add(nextContactId, submission);
    nextContactId += 1;
  };

  public query ({ caller }) func getAllContactSubmissions() : async [ContactSubmission] {
    contactSubmissions.values().toArray();
  };

  public shared ({ caller }) func addProduct(name : Text, description : Text, price : Nat, unit : Text, category : Text, imageUrl : Text, quantity : Nat) : async Nat {
    let product : Product = {
      id = nextProductId;
      name;
      description;
      price;
      unit;
      category;
      imageUrl;
      isAvailable = quantity > 0;
      quantity;
    };
    products.add(nextProductId, product);
    nextProductId += 1;
    product.id;
  };
};
