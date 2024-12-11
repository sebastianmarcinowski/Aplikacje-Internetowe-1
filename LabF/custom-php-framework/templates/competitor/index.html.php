<?php

/** @var \App\Model\Competitor[] $competitors */
/** @var \App\Service\Router $router */

$title = 'Competitor List';
$bodyClass = 'index';

ob_start(); ?>
    <h1>Competitors List</h1>

    <a href="<?= $router->generatePath('competitor-create') ?>">Create new</a>

    <ul class="index-list">
        <?php foreach ($competitors as $competitor): ?>
            <li><h3><?= $competitor->getName() ?> <?=$competitor->getSurname()?></h3>
                <ul class="action-list">
                    <li><a href="<?= $router->generatePath('competitor-show', ['id' => $competitor->getId()]) ?>">Details</a></li>
                    <li><a href="<?= $router->generatePath('competitor-edit', ['id' => $competitor->getId()]) ?>">Edit</a></li>
                </ul>
            </li>
        <?php endforeach; ?>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
