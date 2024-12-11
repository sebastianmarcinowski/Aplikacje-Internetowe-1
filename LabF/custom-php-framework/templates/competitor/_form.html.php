<?php
    /** @var $competitor ?\App\Model\Competitor */
?>

<div class="form-group">
    <label for="name">Name</label>
    <input type="text" id="name" name="competitor[name]" value="<?= $competitor ? $competitor->getName() : '' ?>">
</div>
<div class="form-group">
    <label for="surname">Surname</label>
    <input type="text" id="surname" name="competitor[surname]" value="<?= $competitor ? $competitor->getSurname() : '' ?>">
</div>
<div class="form-group">
    <label for="weight">Weight</label>
    <input type="number" id="weight" name="competitor[weight]" value="<?= $competitor ? $competitor->getWeight() : '' ?>">
</div>
<div class="form-group">
    <label for="wins">Wins</label>
    <input type="number" id="wins" name="competitor[wins]" value="<?= $competitor ? $competitor->getWins() : '' ?>">
</div>
<div class="form-group">
    <label for="losses">Losses</label>
    <input type="number" id="losses" name="competitor[losses]" value="<?= $competitor ? $competitor->getLosses() : '' ?>">
</div>

<div class="form-group">
    <label></label>
    <input type="submit" value="Submit">
</div>
