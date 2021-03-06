// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Post extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Post entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Post must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Post", id.toString(), this);
    }
  }

  static load(id: string): Post | null {
    return changetype<Post | null>(store.get("Post", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get title(): string | null {
    let value = this.get("title");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set title(value: string | null) {
    if (!value) {
      this.unset("title");
    } else {
      this.set("title", Value.fromString(<string>value));
    }
  }

  get contentHash(): string {
    let value = this.get("contentHash");
    return value!.toString();
  }

  set contentHash(value: string) {
    this.set("contentHash", Value.fromString(value));
  }

  get postContent(): string | null {
    let value = this.get("postContent");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set postContent(value: string | null) {
    if (!value) {
      this.unset("postContent");
    } else {
      this.set("postContent", Value.fromString(<string>value));
    }
  }

  get initialReview(): boolean {
    let value = this.get("initialReview");
    return value!.toBoolean();
  }

  set initialReview(value: boolean) {
    this.set("initialReview", Value.fromBoolean(value));
  }

  get challenged(): boolean {
    let value = this.get("challenged");
    return value!.toBoolean();
  }

  set challenged(value: boolean) {
    this.set("challenged", Value.fromBoolean(value));
  }

  get reqExpertise(): BigInt | null {
    let value = this.get("reqExpertise");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set reqExpertise(value: BigInt | null) {
    if (!value) {
      this.unset("reqExpertise");
    } else {
      this.set("reqExpertise", Value.fromBigInt(<BigInt>value));
    }
  }

  get lockExpiration(): BigInt | null {
    let value = this.get("lockExpiration");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set lockExpiration(value: BigInt | null) {
    if (!value) {
      this.unset("lockExpiration");
    } else {
      this.set("lockExpiration", Value.fromBigInt(<BigInt>value));
    }
  }

  get CrS(): BigInt | null {
    let value = this.get("CrS");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set CrS(value: BigInt | null) {
    if (!value) {
      this.unset("CrS");
    } else {
      this.set("CrS", Value.fromBigInt(<BigInt>value));
    }
  }

  get IS(): BigInt | null {
    let value = this.get("IS");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set IS(value: BigInt | null) {
    if (!value) {
      this.unset("IS");
    } else {
      this.set("IS", Value.fromBigInt(<BigInt>value));
    }
  }

  get postValue(): BigInt | null {
    let value = this.get("postValue");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set postValue(value: BigInt | null) {
    if (!value) {
      this.unset("postValue");
    } else {
      this.set("postValue", Value.fromBigInt(<BigInt>value));
    }
  }

  get timestamp(): BigInt | null {
    let value = this.get("timestamp");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set timestamp(value: BigInt | null) {
    if (!value) {
      this.unset("timestamp");
    } else {
      this.set("timestamp", Value.fromBigInt(<BigInt>value));
    }
  }

  get authors(): Array<Bytes> | null {
    let value = this.get("authors");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytesArray();
    }
  }

  set authors(value: Array<Bytes> | null) {
    if (!value) {
      this.unset("authors");
    } else {
      this.set("authors", Value.fromBytesArray(<Array<Bytes>>value));
    }
  }

  get categories(): Array<string> | null {
    let value = this.get("categories");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set categories(value: Array<string> | null) {
    if (!value) {
      this.unset("categories");
    } else {
      this.set("categories", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class FundingReq extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save FundingReq entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type FundingReq must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("FundingReq", id.toString(), this);
    }
  }

  static load(id: string): FundingReq | null {
    return changetype<FundingReq | null>(store.get("FundingReq", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get amountRequested(): BigInt | null {
    let value = this.get("amountRequested");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set amountRequested(value: BigInt | null) {
    if (!value) {
      this.unset("amountRequested");
    } else {
      this.set("amountRequested", Value.fromBigInt(<BigInt>value));
    }
  }

  get returnRate(): BigInt | null {
    let value = this.get("returnRate");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set returnRate(value: BigInt | null) {
    if (!value) {
      this.unset("returnRate");
    } else {
      this.set("returnRate", Value.fromBigInt(<BigInt>value));
    }
  }

  get reqType(): i32 {
    let value = this.get("reqType");
    return value!.toI32();
  }

  set reqType(value: i32) {
    this.set("reqType", Value.fromI32(value));
  }

  get deadline(): BigInt | null {
    let value = this.get("deadline");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set deadline(value: BigInt | null) {
    if (!value) {
      this.unset("deadline");
    } else {
      this.set("deadline", Value.fromBigInt(<BigInt>value));
    }
  }

  get user(): Bytes | null {
    let value = this.get("user");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set user(value: Bytes | null) {
    if (!value) {
      this.unset("user");
    } else {
      this.set("user", Value.fromBytes(<Bytes>value));
    }
  }
}
