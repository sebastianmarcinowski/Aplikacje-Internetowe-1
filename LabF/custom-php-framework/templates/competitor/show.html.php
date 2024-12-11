<?php

/** @var \App\Model\Competitor $competitor */
/** @var \App\Service\Router $router */

$title = "{$competitor->getName()} ({$competitor->getId()})";
$bodyClass = 'show';

ob_start(); ?>
    <h1><?= $competitor->getName()?> <?=$competitor->getSurname()?></h1>
    <article>
        Surname: <?= $competitor->getSurname();?>
        Weight: <?= $competitor->getWeight();?>
        Wins: <?= $competitor->getWins();?>
        Losses: <?= $competitor->getLosses();?>
    </article>

    <ul class="action-list">
        <li> <a href="<?= $router->generatePath('competitor-index') ?>">Back to list</a></li>
        <li><a href="<?= $router->generatePath('competitor-edit', ['id'=> $competitor->getId()]) ?>">Edit</a></li>
    </ul>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
